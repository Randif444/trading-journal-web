//+------------------------------------------------------------------+
//|                                            KangTrader_Webhook.mq5|
//|                                                @2026, Kang Trader|
//+------------------------------------------------------------------+
#property copyright "Kang Trader"
#property link      "https://kang-trader.vercel.app"
#property version   "1.10" // Update versi net profit

// --- SETTING URL NEXT.JS AKANG ---
input string WebhookURL = "https://kang-trader.vercel.app/api/webhook"; 

//+------------------------------------------------------------------+
//| Fungsi ini otomatis jalan tiap ada transaksi (Open/Close)        |
//+------------------------------------------------------------------+
void OnTradeTransaction(const MqlTradeTransaction& trans,
                        const MqlTradeRequest& request,
                        const MqlTradeResult& result)
  {
   // Kita cuma mau proses saat transaksi benar-benar tereksekusi (DEAL)
   if(trans.type == TRADE_TRANSACTION_DEAL_ADD)
     {
      ulong deal_ticket = trans.deal;
      if(HistoryDealSelect(deal_ticket))
        {
         long deal_entry = HistoryDealGetInteger(deal_ticket, DEAL_ENTRY);
         
         // Kita cuma ambil data saat posisi DITUTUP (DEAL_ENTRY_OUT)
         if(deal_entry == DEAL_ENTRY_OUT)
           {
            SendTradeToWebhook(deal_ticket);
           }
        }
     }
  }

//+------------------------------------------------------------------+
//| Fungsi untuk merakit JSON dan menembak ke Web                    |
//+------------------------------------------------------------------+
void SendTradeToWebhook(ulong deal_ticket)
  {
   // 1. Ambil Data Dasar dari Deal penutupan
   string symbol = HistoryDealGetString(deal_ticket, DEAL_SYMBOL);
   double lot = HistoryDealGetDouble(deal_ticket, DEAL_VOLUME);
   double exit_price = HistoryDealGetDouble(deal_ticket, DEAL_PRICE);
   
   // --- LOGIKA PROFIT BERSIH (NET PNL) ---
   double gross_profit = HistoryDealGetDouble(deal_ticket, DEAL_PROFIT);
   double commission = HistoryDealGetDouble(deal_ticket, DEAL_COMMISSION);
   double swap = HistoryDealGetDouble(deal_ticket, DEAL_SWAP);
   
   // Total PnL adalah gabungan ketiganya
   double net_profit = gross_profit + commission + swap;
   
   // 2. Ambil Harga Entry dan Tipe (BUY/SELL) dari riwayat posisi
   long position_id = HistoryDealGetInteger(deal_ticket, DEAL_POSITION_ID);
   double entry_price = 0.0;
   string type_str = "UNKNOWN"; 
   
   if(HistorySelectByPosition(position_id))
     {
      int total = HistoryDealsTotal();
      for(int i=0; i<total; i++)
        {
         ulong ticket = HistoryDealGetTicket(i);
         if(HistoryDealGetInteger(ticket, DEAL_ENTRY) == DEAL_ENTRY_IN)
           {
            entry_price = HistoryDealGetDouble(ticket, DEAL_PRICE);
            long pos_type = HistoryDealGetInteger(ticket, DEAL_TYPE);
            type_str = (pos_type == DEAL_TYPE_BUY) ? "BUY" : "SELL";
            break;
           }
        }
     }
     
   // 3. Format Waktu Penutupan
   datetime time = (datetime)HistoryDealGetInteger(deal_ticket, DEAL_TIME);
   MqlDateTime dt;
   TimeToStruct(time, dt);
   // Format disesuaikan: MM/DD/YYYY agar mudah dibaca Google Sheets
   string date_str = StringFormat("%02d/%02d/%04d", dt.mon, dt.day, dt.year); 

   // 4. Rakit Payload JSON sesuai dengan struktur web Akang
   string json = "{";
   json += "\"Date\":\"" + date_str + "\",";
   json += "\"Pair\":\"" + symbol + "\",";
   json += "\"Type\":\"" + type_str + "\",";
   json += "\"Entry\":" + DoubleToString(entry_price, 5) + ",";
   json += "\"Exit\":" + DoubleToString(exit_price, 5) + ",";
   json += "\"Lot\":" + DoubleToString(lot, 2) + ",";
   json += "\"PnL\":" + DoubleToString(net_profit, 2) + ","; // Memasukkan Net Profit
   json += "\"Note\":\"Auto Log MT5\"";
   json += "}";

   // 5. Eksekusi WebRequest
   char post_data[];
   char result_data[];
   string result_headers;
   
   // Konversi string JSON ke array of chars untuk WebRequest
   StringToCharArray(json, post_data, 0, WHOLE_ARRAY, CP_UTF8);
   ArrayResize(post_data, ArraySize(post_data)-1); // Buang sisa null terminator

   string headers = "Content-Type: application/json\r\n";
   
   int res = WebRequest("POST", WebhookURL, headers, 5000, post_data, result_data, result_headers);
   
   // 6. Log Hasilnya di Tab "Experts" MT5
   if(res == 200)
      Print("✅ [SUCCESS] Webhook Jurnal Terkirim! Pair: ", symbol, " | Net PnL: $", DoubleToString(net_profit, 2));
   else
      Print("❌ [ERROR] Webhook Gagal. HTTP Code: ", res, " | MT5 Error: ", GetLastError());
  }
//+------------------------------------------------------------------+