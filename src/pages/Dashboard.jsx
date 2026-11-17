import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Sparkles,
  Flame,
  Target,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  Zap,
  ArrowUpRight,
  BrainCircuit,
  Volume2
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import StatCard from '../components/common/StatCard';
import Badge from '../components/common/Badge';
import {
  mockUser,
  mockWeeklyProgress,
  mockRecentActivities,
  mockMistakeCategories
} from '../data/mockData';

export default function Dashboard() {
  const goalPercentage = Math.round(
    (mockUser.dailyCompletedMinutes / mockUser.dailyGoalMinutes) * 100
  );

  return (
    <div className="space-y-6 pb-8">
      {/* 1. Welcome Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 p-6 sm:p-8 text-white shadow-lg shadow-brand-500/20">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Smart AI Coach Ready</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Good morning, {mockUser.name}!
            </h2>
            <p className="text-sm sm:text-base text-indigo-100 font-medium leading-relaxed">
              You are on an <span className="font-bold text-amber-300">{mockUser.streakDays}-day streak</span>! You need just{' '}
              <span className="font-bold underline decoration-white/40">10 more minutes</span> to complete today's speaking target.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <NavLink
              to="/practice"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-bold text-brand-700 shadow-md transition-all hover:bg-brand-50 hover:shadow-lg active:scale-95"
            >
              <MessageSquare className="h-4 w-4" />
              Continue Conversation
            </NavLink>
            <NavLink
              to="/grammar"
              className="inline-flex items-center gap-2 rounded-2xl bg-white/15 px-4 py-3 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/25 transition-all"
            >
              <Zap className="h-4 w-4 text-amber-300" />
              Quick Grammar Drill
            </NavLink>
          </div>
        </div>

        {/* Decorative background circles */}
        <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute left-1/2 -top-20 h-48 w-48 rounded-full bg-purple-400/20 blur-xl pointer-events-none" />
      </div>

      {/* 2. Key Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Fluency"
          value={`${mockUser.overallFluency}%`}
          subtitle="CEFR B2 Level"
          trend={5}
          icon={TrendingUp}
          iconBg="bg-indigo-50 text-indigo-600"
        />
        <StatCard
          title="Grammar Accuracy"
          value={`${mockUser.grammarAccuracy}%`}
          subtitle="Past 30 days"
          trend={8}
          icon={Award}
          iconBg="bg-emerald-50 text-emerald-600"
        />
        <StatCard
          title="Words Mastered"
          value={mockUser.wordsLearned}
          subtitle="+14 this week"
          trend={12}
          icon={BookOpen}
          iconBg="bg-amber-50 text-amber-600"
        />
        <StatCard
          title="Total Practice"
          value={`${mockUser.totalSessions}`}
          subtitle="Completed sessions"
          trend={3}
          icon={BrainCircuit}
          iconBg="bg-purple-50 text-purple-600"
        />
      </div>

      {/* 3. Middle Section: Daily Goal & Streak + Weekly Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Daily Goal & Streak Card */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-brand-600" />
                <h3 className="font-bold text-slate-900">Today's Daily Target</h3>
              </div>
              <Badge variant="brand">{goalPercentage}% Met</Badge>
            </div>

            <div className="mt-6 flex flex-col items-center justify-center text-center">
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-slate-50 border-8 border-slate-100">
                <div
                  className="absolute inset-0 rounded-full border-8 border-brand-600 transition-all duration-1000"
                  style={{
                    clipPath: `polygon(50% 50%, 50% 0%, ${
                      goalPercentage >= 25 ? '100% 0%' : '50% 0%'
                    }, ${goalPercentage >= 50 ? '100% 100%' : '100% 0%'}, ${
                      goalPercentage >= 75 ? '0% 100%' : '100% 100%'
                    }, ${
                      goalPercentage >= 100 ? '0% 0%' : '0% 100%'
                    })`,
                  }}
                />
                <div className="z-10 flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-slate-900">
                    {mockUser.dailyCompletedMinutes}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    of {mockUser.dailyGoalMinutes} mins
                  </span>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-500 font-medium max-w-xs">
                Consistent 20-minute daily speaking sessions increase fluency retention by up to 65%.
              </p>
            </div>

            {/* Daily Breakdowns */}
            <div className="mt-6 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-500" />
                  AI Conversation
                </span>
                <span className="font-bold text-slate-800">12 mins</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Grammar Drills
                </span>
                <span className="font-bold text-slate-800">5 mins</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  Vocabulary Flashcards
                </span>
                <span className="font-bold text-slate-800">3 mins</span>
              </div>
            </div>
          </div>

          {/* 7-day Streak Dots */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
                7-Day Streak Tracker
              </span>
              <span className="text-xs font-semibold text-amber-600">Active!</span>
            </div>
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
                const isCompleted = idx <= 5; // Monday to Saturday done
                const isToday = idx === 6; // Sunday is today
                return (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-bold transition-all ${
                        isCompleted
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : isToday
                          ? 'bg-brand-500 text-white shadow-sm ring-2 ring-brand-200'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {isCompleted ? '✓' : day}
                    </div>
                    <span className="text-[10px] font-medium text-slate-400">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (2 cols): Weekly Progress Chart */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Weekly Fluency & Accuracy</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Speech flow and grammatical precision tracked across this week's turns.
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-brand-600">
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-600" />
                  Fluency %
                </span>
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  Accuracy %
                </span>
              </div>
            </div>

            {/* Recharts Chart */}
            <div className="mt-4 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={mockWeeklyProgress}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="fluencyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="accuracyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                  />
                  <YAxis
                    domain={[50, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="fluency"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#fluencyGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    strokeDasharray="4 4"
                    fillOpacity={1}
                    fill="url(#accuracyGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Coach Recommendation Banner */}
          <div className="mt-4 rounded-2xl bg-brand-50/70 p-4 border border-brand-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shrink-0">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-brand-900">
                  Coach Recommendation for Today:
                </p>
                <p className="text-xs text-brand-700 font-medium">
                  Practice conditional sentences (if/when) to improve your fluency consistency.
                </p>
              </div>
            </div>
            <NavLink
              to="/grammar"
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-700 hover:text-brand-900 shrink-0"
            >
              Start Drill
              <ArrowRight className="h-3.5 w-3.5" />
            </NavLink>
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: Recent Activities & Grammar Mistakes to Watch */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities (2 cols) */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Recent Activities</h3>
              <p className="text-xs text-slate-500 font-medium">
                Your completed speaking sessions, exercises, and vocabulary drills.
              </p>
            </div>
            <NavLink
              to="/progress"
              className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center gap-1"
            >
              View Full History
              <ArrowRight className="h-3.5 w-3.5" />
            </NavLink>
          </div>

          <div className="mt-4 divide-y divide-slate-100">
            {mockRecentActivities.map((act) => (
              <div
                key={act.id}
                className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/70 rounded-xl px-2 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 shrink-0">
                    {act.type.includes('Conversation') ? (
                      <MessageSquare className="h-5 w-5 text-brand-600" />
                    ) : act.type.includes('Grammar') ? (
                      <Sparkles className="h-5 w-5 text-emerald-600" />
                    ) : act.type.includes('Interview') ? (
                      <Target className="h-5 w-5 text-purple-600" />
                    ) : (
                      <BookOpen className="h-5 w-5 text-amber-600" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{act.title}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{act.type}</span>
                      <span>•</span>
                      <span>{act.time}</span>
                      <span>•</span>
                      <span>{act.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-extrabold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                    {act.score}% Score
                  </span>
                  <NavLink
                    to="/practice"
                    className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Problem Areas to Target */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900">Mistakes to Watch</h3>
              <p className="text-xs text-slate-500 font-medium">
                Repeated error patterns identified by the AI agent.
              </p>
            </div>

            <div className="mt-4 space-y-4">
              {mockMistakeCategories.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">{item.category}</span>
                    <span className="font-semibold text-slate-500">{item.count} logged</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <NavLink
            to="/grammar"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            Review Specific Grammar Rules
            <ArrowRight className="h-3.5 w-3.5" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}
