import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  subValue?: string;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  subValue,
}: StatCardProps) {
  return (
    <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-sm hover:border-slate-700 transition-colors">
      <div className="flex items-center justify-between pb-2">
        <h3 className="text-sm font-medium text-slate-400">{title}</h3>
        <Icon className="h-4 w-4 text-slate-500" />
      </div>
      <div className="flex flex-col gap-1">
        <span
          className={`text-2xl font-bold ${
            trend === "up"
              ? "text-emerald-400"
              : trend === "down"
                ? "text-rose-400"
                : "text-slate-100"
          }`}
        >
          {value}
        </span>
        {subValue && <p className="text-xs text-slate-500">{subValue}</p>}
      </div>
    </div>
  );
}
