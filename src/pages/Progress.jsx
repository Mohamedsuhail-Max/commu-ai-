import React, { useState } from 'react';
import {
  TrendingUp,
  Calendar,
  Award,
  BookOpen,
  Sparkles,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Flame,
  Filter
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import StatCard from '../components/common/StatCard';
import Badge from '../components/common/Badge';
import {
  mockWeeklyProgress,
  mockMonthlyProgress,
  mockMistakeCategories,
  mockPracticeHistory,
  mockUser
} from '../data/mockData';

export default function Progress() {
  const [timeframe, setTimeframe] = useState('weekly');
  const [typeFilter, setTypeFilter] = useState('All');

  const chartData = timeframe === 'weekly' ? mockWeeklyProgress : mockMonthlyProgress;

  const filteredHistory = mockPracticeHistory.filter((item) => {
    return typeFilter === 'All' || item.type === typeFilter;
  });

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner & Timeframe Switcher */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 border border-brand-200">
              <TrendingUp className="h-3.5 w-3.5 text-brand-600" />
              Growth & Mastery Analytics
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Your English Fluency Trajectory
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Measurable progress across conversation speed, grammatical precision, and vocabulary depth.
            </p>
          </div>

          {/* Timeframe pill toggle */}
          <div className="flex items-center rounded-2xl bg-slate-100 p-1 self-start sm:self-auto">
            <button
              onClick={() => setTimeframe('weekly')}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                timeframe === 'weekly'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setTimeframe('monthly')}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                timeframe === 'monthly'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              This Month
            </button>
          </div>
        </div>

        {/* 4 Stats Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
          <StatCard
            title="Fluency Score"
            value={`${mockUser.overallFluency}%`}
            subtitle="CEFR B2 Level"
            trend={6}
            icon={TrendingUp}
            iconBg="bg-indigo-50 text-indigo-600"
          />
          <StatCard
            title="Grammar Accuracy"
            value={`${mockUser.grammarAccuracy}%`}
            subtitle="Error rate down 14%"
            trend={9}
            icon={Award}
            iconBg="bg-emerald-50 text-emerald-600"
          />
          <StatCard
            title="Vocabulary Growth"
            value={mockUser.wordsLearned}
            subtitle="C1-level active words"
            trend={14}
            icon={BookOpen}
            iconBg="bg-amber-50 text-amber-600"
          />
          <StatCard
            title="Active Streak"
            value={`${mockUser.streakDays} Days`}
            subtitle="Consistency index 94%"
            trend={10}
            icon={Flame}
            iconBg="bg-rose-50 text-rose-600"
          />
        </div>
      </div>

      {/* Main Charts Grid: Fluency Chart + Practice Minutes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Fluency & Accuracy Chart (2 cols) */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Fluency vs. Accuracy Trends</h3>
              <p className="text-xs text-slate-500 font-medium">
                Tracking coherence, hesitation reduction, and grammatical syntax over time.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-brand-600">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-600" />
                Fluency Score
              </span>
              <span className="flex items-center gap-1.5 text-emerald-600">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Accuracy Score
              </span>
            </div>
          </div>

          <div className="mt-6 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="progFluency" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="progAccuracy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey={timeframe === 'weekly' ? 'day' : 'week'}
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
                  fill="url(#progFluency)"
                />
                <Area
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#progAccuracy)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daily Minutes Bar Chart */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-lg">Daily Practice Volume</h3>
              <p className="text-xs text-slate-500 font-medium">
                Minutes spent speaking and completing exercises.
              </p>
            </div>

            <div className="mt-4 h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockWeeklyProgress} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b', fontSize: 11 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="minutes" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Weekly Total:</span>
            <span className="font-extrabold text-slate-900">195 minutes (~3.2 hrs)</span>
          </div>
        </div>
      </div>

      {/* Grammar Breakdown & Vocabulary Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grammar Improvement Breakdown */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-lg">Grammar Error Reduction</h3>
            <p className="text-xs text-slate-500 font-medium">
              Frequency distribution of recurring mistakes over your past 50 conversation turns.
            </p>
          </div>

          <div className="mt-5 space-y-4">
            {mockMistakeCategories.map((m, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{m.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-medium">{m.count} errors</span>
                    <span className="font-extrabold text-slate-700">{m.percentage}%</span>
                  </div>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${m.percentage}%`,
                      backgroundColor: m.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vocabulary Progress */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-lg">Vocabulary Mastery Tier</h3>
              <p className="text-xs text-slate-500 font-medium">
                Retention breakdown based on spaced repetition intervals.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-100 text-center">
                <span className="text-2xl font-black text-emerald-700">76</span>
                <span className="block text-xs font-bold text-emerald-800 mt-1">Mastered</span>
                <span className="text-[10px] text-emerald-600">Retained &gt; 90%</span>
              </div>
              <div className="rounded-2xl bg-amber-50 p-4 border border-amber-100 text-center">
                <span className="text-2xl font-black text-amber-700">42</span>
                <span className="block text-xs font-bold text-amber-800 mt-1">Reviewing</span>
                <span className="text-[10px] text-amber-600">Active Drills</span>
              </div>
              <div className="rounded-2xl bg-indigo-50 p-4 border border-indigo-100 text-center">
                <span className="text-2xl font-black text-brand-700">24</span>
                <span className="block text-xs font-bold text-brand-800 mt-1">Learning</span>
                <span className="text-[10px] text-brand-600">Newly Introduced</span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4 border border-slate-100 text-xs text-slate-600 leading-relaxed">
              <p className="font-bold text-slate-800 mb-1">Coach Insight:</p>
              Your active vocabulary in technical interviews has grown by 18% this month. Your next milestone is incorporating more idiomatic transition phrases (e.g., "having said that", "on the flip side").
            </div>
          </div>
        </div>
      </div>

      {/* Practice History Table */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Practice History Log</h3>
            <p className="text-xs text-slate-500 font-medium">
              Detailed breakdown of your completed learning activities.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {['All', 'Conversation', 'Grammar', 'Interview', 'Vocabulary'].map((f) => (
              <button
                key={f}
                onClick={() => setTypeFilter(f)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  typeFilter === f
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-y border-slate-100">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Session Topic</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">Performance Score</th>
                <th className="py-3 px-4">Mistakes</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-500 whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {item.topic}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant="slate">{item.type}</Badge>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium">
                    {item.duration}
                  </td>
                  <td className="py-3.5 px-4 font-black text-slate-800">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-lg ${
                        item.score >= 90
                          ? 'bg-emerald-50 text-emerald-700'
                          : item.score >= 80
                          ? 'bg-indigo-50 text-brand-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {item.score}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-medium">
                    {item.mistakesLogged} logged
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
