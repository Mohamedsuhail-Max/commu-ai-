import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  Plus,
  Volume2,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Bookmark,
  Layers,
  GraduationCap
} from 'lucide-react';
import Badge from '../components/common/Badge';
import { mockVocabularyList } from '../data/mockData';

export default function Vocabulary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [vocabList, setVocabList] = useState(mockVocabularyList);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWord, setNewWord] = useState({
    word: '',
    phonetic: '',
    partOfSpeech: 'Adjective',
    definition: '',
    example: '',
    category: 'Business',
  });

  const categories = ['All', 'Business', 'Communication', 'Interview', 'Technical', 'Interpersonal'];
  const statuses = ['All', 'Learning', 'Reviewing', 'Mastered'];

  const filteredWords = vocabList.filter((item) => {
    const matchesSearch =
      item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'All' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleStatusChange = (wordId, nextStatus) => {
    setVocabList(
      vocabList.map((item) =>
        item.id === wordId ? { ...item, status: nextStatus } : item
      )
    );
  };

  const handleAddWord = (e) => {
    e.preventDefault();
    if (!newWord.word || !newWord.definition) return;

    const created = {
      id: `v-${Date.now()}`,
      ...newWord,
      status: 'Learning',
      level: 'B2',
    };

    setVocabList([created, ...vocabList]);
    setNewWord({
      word: '',
      phonetic: '',
      partOfSpeech: 'Adjective',
      definition: '',
      example: '',
      category: 'Business',
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner & Stats */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 border border-amber-200">
              <BookOpen className="h-3.5 w-3.5 text-amber-600" />
              Active Vocabulary Bank
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Expand Your Lexicon & Precision
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Review high-frequency professional terms, phrasal verbs, and expressive idioms.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-brand-500/25 hover:bg-brand-700 transition-all self-start sm:self-auto active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Add New Word
          </button>
        </div>

        {/* Quick count metrics */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-100">
          <div className="rounded-2xl bg-slate-50 p-3 text-center">
            <span className="text-xl sm:text-2xl font-black text-slate-900">
              {vocabList.length}
            </span>
            <span className="block text-[11px] font-semibold text-slate-400 uppercase">
              Total Saved
            </span>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-3 text-center">
            <span className="text-xl sm:text-2xl font-black text-emerald-700">
              {vocabList.filter((v) => v.status === 'Mastered').length}
            </span>
            <span className="block text-[11px] font-semibold text-emerald-600 uppercase">
              Mastered
            </span>
          </div>
          <div className="rounded-2xl bg-amber-50 p-3 text-center">
            <span className="text-xl sm:text-2xl font-black text-amber-700">
              {vocabList.filter((v) => v.status === 'Reviewing').length}
            </span>
            <span className="block text-[11px] font-semibold text-amber-600 uppercase">
              Reviewing
            </span>
          </div>
          <div className="rounded-2xl bg-brand-50 p-3 text-center">
            <span className="text-xl sm:text-2xl font-black text-brand-700">
              {vocabList.filter((v) => v.status === 'Learning').length}
            </span>
            <span className="block text-[11px] font-semibold text-brand-600 uppercase">
              Learning
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl bg-white p-4 border border-slate-200/80 shadow-sm">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search words, definitions, or examples..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2 pl-10 pr-4 text-xs sm:text-sm text-slate-800 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Word Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredWords.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-brand-200"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                      {item.word}
                    </h3>
                    <button
                      onClick={() => alert(`Pronouncing: "${item.word}"`)}
                      className="rounded-lg p-1 text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                      title="Audio Pronunciation"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {item.phonetic || '/--/'}
                  </span>
                </div>

                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider uppercase ${
                    item.status === 'Mastered'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : item.status === 'Reviewing'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              {/* Badges */}
              <div className="mt-3 flex items-center gap-2">
                <Badge variant="slate">{item.partOfSpeech}</Badge>
                <Badge variant="brand">{item.category}</Badge>
                <span className="text-[10px] font-bold text-slate-400">
                  Level {item.level || 'B2'}
                </span>
              </div>

              {/* Definition */}
              <p className="mt-4 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {item.definition}
              </p>

              {/* Example sentence */}
              <div className="mt-4 rounded-2xl bg-slate-50 p-3.5 border border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  In Context:
                </span>
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  "{item.example}"
                </p>
              </div>
            </div>

            {/* Status change action pills */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px] font-medium">
                Mark status:
              </span>
              <div className="flex items-center gap-1.5">
                {['Learning', 'Reviewing', 'Mastered'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(item.id, st)}
                    className={`rounded-lg px-2 py-1 text-[11px] font-bold transition-all ${
                      item.status === st
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredWords.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center text-slate-400 space-y-2">
          <BookOpen className="h-8 w-8 mx-auto text-slate-300" />
          <p className="text-sm font-semibold">No vocabulary words match your search criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedStatus('All');
            }}
            className="text-xs font-bold text-brand-600 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Add New Word Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-brand-600" />
                Add New Vocabulary Item
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddWord} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Word / Phrase *
                  </label>
                  <input
                    type="text"
                    required
                    value={newWord.word}
                    onChange={(e) => setNewWord({ ...newWord, word: e.target.value })}
                    placeholder="e.g. Articulate"
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Phonetic (Optional)
                  </label>
                  <input
                    type="text"
                    value={newWord.phonetic}
                    onChange={(e) => setNewWord({ ...newWord, phonetic: e.target.value })}
                    placeholder="e.g. /ɑːrˈtɪk.jə.lət/"
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Part of Speech
                  </label>
                  <select
                    value={newWord.partOfSpeech}
                    onChange={(e) =>
                      setNewWord({ ...newWord, partOfSpeech: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-900 focus:border-brand-500 focus:outline-none"
                  >
                    <option>Adjective</option>
                    <option>Noun</option>
                    <option>Verb</option>
                    <option>Phrasal Verb</option>
                    <option>Idiom</option>
                    <option>Adverb</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Category
                  </label>
                  <select
                    value={newWord.category}
                    onChange={(e) => setNewWord({ ...newWord, category: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-900 focus:border-brand-500 focus:outline-none"
                  >
                    <option>Business</option>
                    <option>Communication</option>
                    <option>Interview</option>
                    <option>Technical</option>
                    <option>Interpersonal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Definition *
                </label>
                <textarea
                  rows={2}
                  required
                  value={newWord.definition}
                  onChange={(e) => setNewWord({ ...newWord, definition: e.target.value })}
                  placeholder="Clear and concise explanation..."
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Example Sentence *
                </label>
                <textarea
                  rows={2}
                  required
                  value={newWord.example}
                  onChange={(e) => setNewWord({ ...newWord, example: e.target.value })}
                  placeholder="How to use it in a sentence..."
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-brand-600 px-5 py-2 text-xs font-bold text-white shadow-md shadow-brand-500/25 hover:bg-brand-700 transition-all"
                >
                  Save Word
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
