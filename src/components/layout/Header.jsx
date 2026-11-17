import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Menu,
  Flame,
  Sparkles,
  Bell,
  Search,
  Mic,
  ShieldCheck
} from 'lucide-react';
import { mockUser } from '../../data/mockData';

const pageTitles = {
  '/': { title: 'Dashboard', subtitle: 'Welcome back! Ready for today\'s speaking challenge?' },
  '/practice': { title: 'AI Conversation Practice', subtitle: 'Practice real-world dialogues with your personalized AI tutor.' },
  '/grammar': { title: 'Smart Grammar Coach', subtitle: 'Instant corrections, deep explanations, and sentence rewrites.' },
  '/vocabulary': { title: 'Vocabulary Vault', subtitle: 'Master high-impact idioms, phrasal verbs, and professional terms.' },
  '/interview': { title: 'Interview Simulator', subtitle: 'Targeted STAR behavioral questions with instant clarity & delivery scoring.' },
  '/progress': { title: 'Learning Analytics', subtitle: 'Track your fluency trajectory, mistake patterns, and consistency.' },
  '/settings': { title: 'Account & Learning Settings', subtitle: 'Customize your coach persona, goals, and feedback strictness.' },
};

export default function Header({ onMenuClick }) {
  const location = useLocation();
  const current = pageTitles[location.pathname] || {
    title: 'AI Communication Coach',
    subtitle: 'Elevate your professional English communication skills.',
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 sm:px-6 lg:px-8 backdrop-blur-md">
      {/* Left side: hamburger + titles */}
      <div className="flex items-center gap-3 lg:gap-6">
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              {current.title}
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-100">
              <ShieldCheck className="h-3 w-3" />
              Online
            </span>
          </div>
          <p className="hidden md:block text-xs text-slate-500 font-medium">
            {current.subtitle}
          </p>
        </div>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Streak Counter Pill */}
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-amber-200/80 bg-gradient-to-r from-amber-50 to-orange-50 px-3.5 py-1.5 shadow-sm">
          <Flame className="h-4 w-4 fill-amber-500 text-amber-500 animate-pulse" />
          <span className="text-xs font-bold text-amber-800">
            {mockUser.streakDays} Days
          </span>
        </div>

        {/* Quick Action Button */}
        <NavLink
          to="/practice"
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm shadow-brand-500/25 transition-all hover:shadow-md hover:shadow-brand-500/35 hover:from-brand-700 hover:to-indigo-700 active:scale-95"
        >
          <Sparkles className="h-4 w-4" />
          <span className="hidden sm:inline">Start Practice</span>
          <span className="sm:hidden">Practice</span>
        </NavLink>

        {/* Notifications */}
        <button
          className="relative rounded-xl border border-slate-200/80 p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-700"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-500 ring-2 ring-white" />
        </button>

        {/* User Avatar */}
        <NavLink to="/settings" className="block">
          <img
            src={mockUser.avatar}
            alt={mockUser.name}
            className="h-10 w-10 rounded-xl object-cover ring-2 ring-slate-100 hover:ring-brand-400 transition-all"
          />
        </NavLink>
      </div>
    </header>
  );
}
