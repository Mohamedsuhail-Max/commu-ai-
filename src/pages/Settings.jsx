import React, { useState } from 'react';
import {
  User,
  Settings as SettingsIcon,
  Target,
  Sparkles,
  Bell,
  Shield,
  Save,
  Check,
  Globe,
  Sliders,
  GraduationCap
} from 'lucide-react';
import Badge from '../components/common/Badge';
import { mockUser } from '../data/mockData';

export default function Settings() {
  const [profile, setProfile] = useState({
    name: mockUser.name,
    email: mockUser.email,
    avatar: mockUser.avatar,
    nativeLanguage: 'Spanish',
    targetDialect: 'US English',
    proficiency: 'Intermediate (B1-B2)',
    primaryGoal: 'Tech Job Interviews & Professional Fluency',
    feedbackStrictness: 'Balanced',
    dailyGoalMinutes: 30,
    dailyVocabTarget: 5,
    emailReminders: true,
    audioCorrections: true,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 pb-8 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            <SettingsIcon className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Settings & Learning Preferences
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Configure your profile, daily time commitments, and AI coach strictness.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Profile Section */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">User Profile</h3>
              <p className="text-xs text-slate-500 font-medium">
                Your personal details and linguistic background.
              </p>
            </div>
            <Badge variant="brand">Student Account</Badge>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src={profile.avatar}
              alt="Avatar"
              className="h-20 w-20 rounded-2xl object-cover ring-4 ring-brand-100 shadow-sm"
            />
            <div className="space-y-2 text-center sm:text-left">
              <button
                type="button"
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Change Photo
              </button>
              <p className="text-[11px] text-slate-400">
                Recommended: Square JPG or PNG, at least 400x400px.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-slate-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-slate-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Native / First Language
              </label>
              <select
                value={profile.nativeLanguage}
                onChange={(e) =>
                  setProfile({ ...profile, nativeLanguage: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-slate-800 focus:border-brand-500 focus:outline-none"
              >
                <option>Spanish</option>
                <option>Mandarin</option>
                <option>Hindi</option>
                <option>Arabic</option>
                <option>French</option>
                <option>German</option>
                <option>Portuguese</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Target English Dialect
              </label>
              <select
                value={profile.targetDialect}
                onChange={(e) =>
                  setProfile({ ...profile, targetDialect: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-slate-800 focus:border-brand-500 focus:outline-none"
              >
                <option>US English (General American)</option>
                <option>UK English (Received Pronunciation)</option>
                <option>Australian English</option>
                <option>Canadian English</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2. Learning Preferences & Coach Strictness */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-lg">AI Coach Preferences</h3>
            <p className="text-xs text-slate-500 font-medium">
              Control how strictly your coach checks grammar and where practice should focus.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Current English Proficiency Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'Beginner (A1-A2)', label: 'Beginner (A1-A2)', desc: 'Basic vocabulary & simple sentences' },
                  { id: 'Intermediate (B1-B2)', label: 'Intermediate (B1-B2)', desc: 'Professional conversations & fluency' },
                  { id: 'Advanced (C1-C2)', label: 'Advanced (C1-C2)', desc: 'Nuanced idiom, tone & executive presence' },
                ].map((tier) => (
                  <button
                    type="button"
                    key={tier.id}
                    onClick={() => setProfile({ ...profile, proficiency: tier.id })}
                    className={`rounded-2xl border p-4 text-left transition-all ${
                      profile.proficiency === tier.id
                        ? 'border-brand-500 bg-brand-50/60 shadow-sm ring-2 ring-brand-200'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs font-extrabold text-slate-900 block">
                      {tier.label}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-1">
                      {tier.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Feedback Strictness Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'Gentle', desc: 'Focuses primarily on flow; corrects only major errors.' },
                  { id: 'Balanced', desc: 'Balanced corrections with encouraging praise.' },
                  { id: 'Strict', desc: 'Catches every preposition, tense, and article flaw.' },
                ].map((st) => (
                  <button
                    type="button"
                    key={st.id}
                    onClick={() => setProfile({ ...profile, feedbackStrictness: st.id })}
                    className={`rounded-2xl border p-3 text-left transition-all ${
                      profile.feedbackStrictness === st.id
                        ? 'border-brand-500 bg-brand-50/70 shadow-sm ring-2 ring-brand-200'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-900 block">
                      {st.id}
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      {st.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Primary Goal
              </label>
              <input
                type="text"
                value={profile.primaryGoal}
                onChange={(e) => setProfile({ ...profile, primaryGoal: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm text-slate-800 focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 3. Daily Goals & Commitment */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-lg">Daily Goals & Notification</h3>
            <p className="text-xs text-slate-500 font-medium">
              Maintain your learning streak with customizable daily targets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Target Daily Practice Time
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[15, 30, 45].map((mins) => (
                  <button
                    type="button"
                    key={mins}
                    onClick={() => setProfile({ ...profile, dailyGoalMinutes: mins })}
                    className={`rounded-xl border py-2 text-xs font-bold transition-all ${
                      profile.dailyGoalMinutes === mins
                        ? 'border-brand-500 bg-brand-50 text-brand-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {mins} mins/day
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Daily New Vocabulary Target
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[3, 5, 10].map((words) => (
                  <button
                    type="button"
                    key={words}
                    onClick={() => setProfile({ ...profile, dailyVocabTarget: words })}
                    className={`rounded-xl border py-2 text-xs font-bold transition-all ${
                      profile.dailyVocabTarget === words
                        ? 'border-brand-500 bg-brand-50 text-brand-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {words} words/day
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Daily Streak Reminder Notifications
                </p>
                <p className="text-[11px] text-slate-400">
                  Receive a gentle prompt if your daily goal isn't met by 7 PM.
                </p>
              </div>
              <input
                type="checkbox"
                checked={profile.emailReminders}
                onChange={(e) =>
                  setProfile({ ...profile, emailReminders: e.target.checked })
                }
                className="h-4 w-4 rounded text-brand-600 focus:ring-brand-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Audio Speech Output Enabled
                </p>
                <p className="text-[11px] text-slate-400">
                  AI coach can speak out pronunciation and corrections.
                </p>
              </div>
              <input
                type="checkbox"
                checked={profile.audioCorrections}
                onChange={(e) =>
                  setProfile({ ...profile, audioCorrections: e.target.checked })
                }
                className="h-4 w-4 rounded text-brand-600 focus:ring-brand-500"
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 animate-in fade-in">
              <Check className="h-4 w-4" />
              Settings saved successfully!
            </span>
          ) : (
            <span className="text-xs text-slate-400">
              Changes apply across all speaking and exercise modules.
            </span>
          )}

          <button
            type="submit"
            className="flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-brand-500/25 hover:bg-brand-700 transition-all active:scale-95"
          >
            <Save className="h-4 w-4" />
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
