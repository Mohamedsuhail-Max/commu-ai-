import React from 'react';

const variants = {
  brand: 'bg-brand-50 text-brand-700 border-brand-200',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  rose: 'bg-rose-50 text-rose-700 border-rose-200',
  slate: 'bg-slate-100 text-slate-700 border-slate-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
};

export default function Badge({ children, variant = 'brand', className = '' }) {
  const variantClasses = variants[variant] || variants.brand;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
}
