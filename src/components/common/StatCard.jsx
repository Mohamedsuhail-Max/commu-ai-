import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendLabel = 'vs last week',
  iconBg = 'bg-brand-50 text-brand-600',
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-slate-300">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
          {title}
        </span>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg} transition-transform group-hover:scale-110`}>
          {Icon && <Icon className="h-5 w-5" />}
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          {value}
        </span>
        {subtitle && (
          <span className="text-xs font-medium text-slate-400">
            {subtitle}
          </span>
        )}
      </div>

      {trend !== undefined && (
        <div className="mt-3 flex items-center gap-1.5 text-xs font-medium">
          <span
            className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-bold text-[11px] ${
              trend >= 0
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-rose-50 text-rose-700'
            }`}
          >
            {trend >= 0 ? (
              <ArrowUpRight className="h-3 w-3 stroke-[2.5]" />
            ) : (
              <ArrowDownRight className="h-3 w-3 stroke-[2.5]" />
            )}
            {Math.abs(trend)}%
          </span>
          <span className="text-slate-400">{trendLabel}</span>
        </div>
      )}
    </div>
  );
}
