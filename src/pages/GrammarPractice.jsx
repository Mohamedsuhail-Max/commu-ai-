import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  BookOpen,
  BookmarkPlus,
  RefreshCw,
  Lightbulb,
  Copy,
  Check
} from 'lucide-react';
import Badge from '../components/common/Badge';
import { mockGrammarExamples } from '../data/mockData';

export default function GrammarPractice() {
  const [selectedExample, setSelectedExample] = useState(mockGrammarExamples[0]);
  const [inputText, setInputText] = useState(mockGrammarExamples[0].input);
  const [result, setResult] = useState(mockGrammarExamples[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedRules, setSavedRules] = useState([]);

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      // Find matching mock or build generic smart correction
      const matched = mockGrammarExamples.find(
        (ex) => ex.input.toLowerCase() === inputText.trim().toLowerCase()
      );

      if (matched) {
        setResult(matched);
      } else {
        // Dynamic smart response fallback
        setResult({
          id: `custom-${Date.now()}`,
          input: inputText,
          corrected: inputText
            .replace(/\bi go\b/gi, 'I went')
            .replace(/\bshe don't\b/gi, "she doesn't")
            .replace(/\bmeeted\b/gi, 'met')
            .replace(/\bsince two years\b/gi, 'for two years'),
          category: 'Natural Phrasing & Tense Harmony',
          explanation:
            "Your sentence is understandable! We adjusted the auxiliary verb and tense harmony to align with natural native phrasing.",
          examples: [
            "Always align your verb tense with the timeline established in your sentence.",
            "Use 'for' when referring to a block or duration of elapsed time.",
          ],
        });
      }
      setIsAnalyzing(false);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result.corrected);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleSaveRule = (ruleId) => {
    if (savedRules.includes(ruleId)) {
      setSavedRules(savedRules.filter((id) => id !== ruleId));
    } else {
      setSavedRules([...savedRules, ruleId]);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header Banner */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            AI Precision Grammar & Style Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Fix Mistakes & Understand the "Why"
          </h2>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            Paste any sentence you wrote for work, study, or an interview. The AI will pinpoint errors, explain the underlying rule, and show real-world examples.
          </p>
        </div>

        {/* Quick Sample Chips */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Try a sample:
          </span>
          {mockGrammarExamples.map((ex, i) => (
            <button
              key={ex.id}
              onClick={() => {
                setSelectedExample(ex);
                setInputText(ex.input);
                setResult(ex);
              }}
              className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
                inputText === ex.input
                  ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-sm'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              Sample {i + 1}: {ex.category}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Input Column & Output Analysis Column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Sentence Input Card */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-brand-600" />
                Original Sentence
              </label>
              <span className="text-xs text-slate-400 font-medium">
                {inputText.length} characters
              </span>
            </div>

            <textarea
              rows={6}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste or write your English sentence here..."
              className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-sm sm:text-base text-slate-800 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200 transition-all leading-relaxed"
            />
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                setInputText('');
                setResult(null);
              }}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
            >
              Clear Text
            </button>
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !inputText.trim()}
              className="flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-brand-500/25 hover:bg-brand-700 disabled:opacity-40 transition-all active:scale-95"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Analyzing Grammar...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Check Grammar
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: AI Feedback & Breakdown Card */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <h3 className="font-bold text-slate-900">AI Coach Correction</h3>
            </div>
            {result && (
              <Badge variant="emerald">{result.category}</Badge>
            )}
          </div>

          {result ? (
            <div className="space-y-4">
              {/* Corrected Text Box */}
              <div className="rounded-2xl bg-emerald-50/70 p-4 border border-emerald-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
                  <span>Natural & Corrected Version:</span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-emerald-700 hover:text-emerald-900 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <p className="text-base font-bold text-emerald-950 leading-relaxed">
                  {result.corrected}
                </p>
              </div>

              {/* In-depth Grammar Explanation */}
              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/80 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Lightbulb className="h-4 w-4 text-amber-500" />
                  Why this change was made:
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {result.explanation}
                </p>
              </div>

              {/* Example Sentences */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  How native speakers use this rule:
                </span>
                <div className="space-y-1.5">
                  {result.examples?.map((ex, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 rounded-xl bg-slate-50/60 p-2.5 text-xs text-slate-700 border border-slate-100"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                      <span>{ex}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Rule Action */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => toggleSaveRule(result.id)}
                  className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold transition-all ${
                    savedRules.includes(result.id)
                      ? 'border-brand-300 bg-brand-50 text-brand-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <BookmarkPlus className="h-4 w-4" />
                  {savedRules.includes(result.id)
                    ? 'Saved in My Weaknesses'
                    : 'Add to My Weaknesses'}
                </button>
                <span className="text-[11px] text-slate-400 font-medium">
                  Rule frequency: 3 times this month
                </span>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-slate-400 space-y-2">
              <Sparkles className="h-8 w-8 mx-auto text-slate-300" />
              <p className="text-sm font-medium">
                Enter a sentence and click "Check Grammar" to view detailed corrections.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
