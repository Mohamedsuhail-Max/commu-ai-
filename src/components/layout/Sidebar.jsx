import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Sparkles,
  BookOpen,
  Briefcase,
  TrendingUp,
  Settings,
  Flame,
  X,
  Target,
  GraduationCap
} from 'lucide-react';
import { mockUser } from '../../data/mockData';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'AI Practice', path: '/practice', icon: MessageSquare, badge: 'Live AI' },
  { name: 'Grammar Coach', path: '/grammar', icon: Sparkles },
  { name: 'Vocabulary', path: '/vocabulary', icon: BookOpen },
  { name: 'Interview Prep', path: '/interview', icon: Briefcase, badge: 'Pro' },
  { name: 'Progress & Stats', path: '/progress', icon: TrendingUp },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200/80 bg-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand header */}
        <div className="flex h-18 items-center justify-between px-6 border-b border-slate-100">
          <NavLink to="/" className="flex items-center gap-3 group" onClick={onClose}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white shadow-md shadow-brand-500/25 transition-transform group-hover:scale-105">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 block leading-tight">
                TalkPulse<span className="text-brand-600">.ai</span>
              </span>
              <span className="text-[11px] font-medium text-slate-400 tracking-wide uppercase">
                AI Communication Coach
              </span>
            </div>
          </NavLink>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
          <p className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
            Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 shadow-sm shadow-brand-100/50'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`h-5 w-5 transition-colors ${
                        isActive
                          ? 'text-brand-600'
                          : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase ${
                          item.badge === 'Live AI'
                            ? 'bg-brand-100 text-brand-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-brand-600" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Daily Goal & Streak Footer widget */}
        <div className="p-4 border-t border-slate-100 space-y-3">
          <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-brand-50/40 p-3.5 border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Target className="h-4 w-4 text-brand-600" />
                Daily Target
              </span>
              <span className="text-xs font-bold text-brand-700">
                {mockUser.dailyCompletedMinutes}/{mockUser.dailyGoalMinutes}m
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/80">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-500 to-indigo-600 transition-all duration-500"
                style={{
                  width: `${Math.min(
                    100,
                    (mockUser.dailyCompletedMinutes / mockUser.dailyGoalMinutes) * 100
                  )}%`,
                }}
              />
            </div>
            <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1 font-medium text-amber-600">
                <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                {mockUser.streakDays} Day Streak!
              </span>
              <span className="text-slate-400">10m left</span>
            </div>
          </div>

          {/* User mini profile */}
          <NavLink
            to="/settings"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl p-2 hover:bg-slate-50 transition-colors"
          >
            <img
              src={mockUser.avatar}
              alt={mockUser.name}
              className="h-9 w-9 rounded-full object-cover ring-2 ring-brand-100"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">{mockUser.name}</p>
              <p className="text-[11px] font-medium text-slate-400 truncate">{mockUser.proficiency}</p>
            </div>
          </NavLink>
        </div>
      </aside>
    </>
  );
}
