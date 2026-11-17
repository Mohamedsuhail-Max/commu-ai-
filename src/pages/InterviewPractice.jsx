import React, { useState } from 'react';
import {
  Briefcase,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Volume2,
  Clock,
  Mic,
  Award,
  Lightbulb,
  Layers,
  ChevronRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import Badge from '../components/common/Badge';
import { mockInterviewQuestions } from '../data/mockData';

export default function InterviewPractice() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const currentQ = mockInterviewQuestions[currentQuestionIndex];

  const handleEvaluate = () => {
    if (!userAnswer.trim()) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setFeedback({
        overallScore: 86,
        breakdown: {
          clarity: 88,
          starStructure: 82,
          vocabulary: 87,
          conciseness: 85,
        },
        strengths: [
          'Directly stated the situation and the technical impact on the team.',
          'Used strong collaborative phrasing ("We evaluated both paths objectively").',
          'Good pacing and natural transition phrases.',
        ],
        improvements: [
          'Highlight the quantifiable outcome at the end (e.g. reduced load time by 30%).',
          'Clarify the specific action you took versus what the overall team handled.',
        ],
        idealResponse:
          "In my previous role, our team had a disagreement regarding whether to rewrite an internal reporting dashboard in React or maintain the legacy template. I facilitated a spike session where we benchmarked maintenance overhead versus development velocity. By presenting the measurable 40% reduction in build times, we reached a unified consensus to migrate incrementally without risking sprint deliverables.",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleNextQuestion = () => {
    setFeedback(null);
    setUserAnswer('');
    setCurrentQuestionIndex((prev) => (prev + 1) % mockInterviewQuestions.length);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Top Header Card */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700 border border-purple-200">
              <Briefcase className="h-3.5 w-3.5 text-purple-600" />
              AI Mock Interview Simulator
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Master High-Stakes English Interviews
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Formulate structured STAR responses and receive instant feedback on clarity and delivery.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Question {currentQuestionIndex + 1} of {mockInterviewQuestions.length}
            </span>
          </div>
        </div>

        {/* Question Selector Tabs */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pt-4 border-t border-slate-100">
          {mockInterviewQuestions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => {
                setCurrentQuestionIndex(idx);
                setFeedback(null);
                setUserAnswer('');
              }}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all ${
                currentQuestionIndex === idx
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Q{idx + 1}: {q.category}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Question Prompt & Input */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Badge variant="purple">{currentQ.role}</Badge>
                <Badge variant="slate">{currentQ.category}</Badge>
              </div>
              <button
                onClick={() => alert(`Reading aloud: "${currentQ.question}"`)}
                className="text-slate-400 hover:text-brand-600 transition-colors"
                title="Listen to question"
              >
                <Volume2 className="h-4 w-4" />
              </button>
            </div>

            {/* The Big Question */}
            <div className="rounded-2xl bg-slate-50 p-5 border border-slate-100">
              <span className="text-[11px] font-bold text-brand-600 uppercase tracking-wider block mb-1">
                Interviewer asks:
              </span>
              <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                "{currentQ.question}"
              </p>
            </div>

            {/* Strategic Coaching Tips */}
            <div className="rounded-2xl bg-amber-50/70 p-4 border border-amber-200/80 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <Lightbulb className="h-4 w-4 text-amber-600" />
                Coach's Strategy Tip:
              </div>
              <ul className="text-xs text-amber-800 space-y-1 list-disc list-inside">
                {currentQ.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>

            {/* User Answer Textarea */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  Your Spoken or Written Response:
                </label>
                <span className="text-xs text-slate-400 font-medium">
                  {userAnswer.trim().split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
              <textarea
                rows={7}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Structure your answer with STAR (Situation, Task, Action, Result). For example: 'In my last project, our team faced a timeline conflict...'"
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-sm text-slate-800 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200 transition-all leading-relaxed"
              />
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setUserAnswer('')}
              className="text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={handleNextQuestion}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all"
              >
                Skip / Next
              </button>
              <button
                onClick={handleEvaluate}
                disabled={isSubmitting || !userAnswer.trim()}
                className="flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-brand-500/25 hover:bg-brand-700 disabled:opacity-40 transition-all active:scale-95"
              >
                {isSubmitting ? (
                  <>Evaluating Answer...</>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Evaluate Response
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right: AI Feedback & Scoring Panel */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Award className="h-5 w-5 text-brand-600" />
                AI Interview Evaluation
              </h3>
              {feedback && (
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {feedback.overallScore}% Overall Score
                </span>
              )}
            </div>

            {feedback ? (
              <div className="mt-4 space-y-5">
                {/* Metric Gauges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="rounded-2xl bg-slate-50 p-3 text-center border border-slate-100">
                    <span className="text-lg font-black text-brand-600">
                      {feedback.breakdown.clarity}%
                    </span>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">
                      Clarity
                    </span>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3 text-center border border-slate-100">
                    <span className="text-lg font-black text-indigo-600">
                      {feedback.breakdown.starStructure}%
                    </span>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">
                      STAR Logic
                    </span>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3 text-center border border-slate-100">
                    <span className="text-lg font-black text-purple-600">
                      {feedback.breakdown.vocabulary}%
                    </span>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">
                      Vocabulary
                    </span>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3 text-center border border-slate-100">
                    <span className="text-lg font-black text-emerald-600">
                      {feedback.breakdown.conciseness}%
                    </span>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">
                      Pacing
                    </span>
                  </div>
                </div>

                {/* Key Strengths */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 uppercase tracking-wider">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Key Strengths Observed:
                  </span>
                  <div className="space-y-1.5">
                    {feedback.strengths.map((s, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl bg-emerald-50/50 p-2.5 text-xs text-emerald-900 border border-emerald-100 flex items-start gap-2"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Targeted Improvements */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-amber-700 flex items-center gap-1.5 uppercase tracking-wider">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    Recommended Adjustments:
                  </span>
                  <div className="space-y-1.5">
                    {feedback.improvements.map((imp, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl bg-amber-50/50 p-2.5 text-xs text-amber-900 border border-amber-100 flex items-start gap-2"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span>{imp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal Model Answer */}
                <div className="rounded-2xl bg-indigo-50/60 p-4 border border-indigo-100 space-y-1.5">
                  <span className="text-xs font-bold text-brand-900 flex items-center gap-1.5 uppercase tracking-wider">
                    <Sparkles className="h-4 w-4 text-brand-600" />
                    AI Benchmark Ideal Answer:
                  </span>
                  <p className="text-xs text-brand-900/90 leading-relaxed italic">
                    "{feedback.idealResponse}"
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-slate-400 space-y-2">
                <Briefcase className="h-10 w-10 mx-auto text-slate-300" />
                <p className="text-sm font-semibold">
                  Type your response on the left and submit to receive instant AI evaluation.
                </p>
                <p className="text-xs text-slate-400">
                  Evaluates clarity, STAR methodology adherence, and vocabulary richness.
                </p>
              </div>
            )}
          </div>

          {feedback && (
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-brand-700 transition-all"
              >
                Next Question
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
