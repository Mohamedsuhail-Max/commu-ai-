import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Mic,
  MicOff,
  Sparkles,
  RotateCcw,
  Bot,
  User,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  ChevronDown,
  Volume2,
  Layers,
  ChevronRight,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import Badge from '../components/common/Badge';
import {
  mockPracticeTopics,
  mockChatConversations,
  mockInitialMessages,
  mockUser
} from '../data/mockData';

export default function AIPractice() {
  const [selectedTopic, setSelectedTopic] = useState(mockPracticeTopics[0]);
  const [messages, setMessages] = useState(mockInitialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [selectedCorrection, setSelectedCorrection] = useState(null);
  const [historyOpen, setHistoryOpen] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSendMessage = (textToSend = inputValue) => {
    if (!textToSend.trim()) return;

    const userMessageText = textToSend.trim();
    const newUserMsg = {
      id: `m-${Date.now()}`,
      sender: 'user',
      text: userMessageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      corrections: null,
    };

    // Lightweight mock correction engine for interactive demo
    if (
      userMessageText.toLowerCase().includes('i go') ||
      userMessageText.toLowerCase().includes('since two years') ||
      userMessageText.toLowerCase().includes('she don\'t') ||
      userMessageText.toLowerCase().includes('meeted')
    ) {
      newUserMsg.corrections = [
        {
          original: 'Detected slight tense or preposition inconsistency',
          corrected: 'Check verb form or duration marker (e.g., for vs since)',
          rule: 'Time Preposition & Verb Agreement',
        },
      ];
    }

    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue('');
    setIsThinking(true);

    // Simulate smart AI response turn
    setTimeout(() => {
      let aiReply = "That's a very clear way to frame your answer! To make it sound even more natural in a professional setting, consider using strong action verbs. What would you do next in that scenario?";
      
      if (userMessageText.toLowerCase().includes('challenge') || userMessageText.toLowerCase().includes('problem')) {
        aiReply = "Overcoming technical friction like that shows great resilience. Did you document the fix for the rest of your engineering team, and how did they receive it?";
      } else if (userMessageText.toLowerCase().includes('hobby') || userMessageText.toLowerCase().includes('weekend')) {
        aiReply = "That sounds wonderfully restorative! Engaging in hobbies outside of work is known to foster creativity. How often do you get time for that?";
      }

      const newAiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        corrections: null,
      };

      setMessages((prev) => [...prev, newAiMsg]);
      setIsThinking(false);
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate speech-to-text transcript
      setTimeout(() => {
        setInputValue((prev) => (prev ? prev + ' ' : '') + 'I have worked on several frontend projects with React.');
        setIsRecording(false);
      }, 2500);
    } else {
      setIsRecording(false);
    }
  };

  const handleQuickPrompt = (promptText) => {
    handleSendMessage(promptText);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8.5rem)]">
      {/* Left / Drawer: Conversation History & Topic Selector */}
      <div
        className={`w-full lg:w-80 flex-col rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm shrink-0 ${
          historyOpen ? 'flex' : 'hidden lg:flex'
        }`}
      >
        {/* Topic dropdown / selector */}
        <div className="pb-4 border-b border-slate-100">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 block">
            Current Practice Persona
          </label>
          <div className="relative">
            <select
              value={selectedTopic.id}
              onChange={(e) => {
                const topic = mockPracticeTopics.find((t) => t.id === e.target.value);
                if (topic) setSelectedTopic(topic);
              }}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pl-3 pr-8 text-xs font-bold text-slate-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
            >
              {mockPracticeTopics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.title} ({topic.category})
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>

          <div className="mt-3 rounded-xl bg-slate-50 p-2.5 border border-slate-100">
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {selectedTopic.description}
            </p>
            <div className="mt-2 flex items-center justify-between">
              <Badge variant="brand">{selectedTopic.difficulty}</Badge>
              <span className="text-[10px] font-bold text-slate-400">
                Mode: Free Dialogue
              </span>
            </div>
          </div>
        </div>

        {/* Previous Chat History Sessions */}
        <div className="mt-4 flex-1 overflow-y-auto space-y-2">
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              Past Conversations
            </span>
            <span className="text-[10px] font-semibold text-slate-400">3 Sessions</span>
          </div>

          {mockChatConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => {
                // switch session mock
              }}
              className={`w-full text-left rounded-xl p-3 border transition-all ${
                conv.topic === selectedTopic.title
                  ? 'border-brand-300 bg-brand-50/60 shadow-sm'
                  : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900 truncate">
                  {conv.topic}
                </span>
                <span className="text-[10px] text-slate-400">{conv.updatedAt}</span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-1">{conv.lastMessage}</p>
            </button>
          ))}
        </div>

        {/* Coach tip box */}
        <div className="mt-4 rounded-2xl bg-amber-50/70 p-3 border border-amber-200/80">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 mb-1">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            Live Coach Tip
          </div>
          <p className="text-[11px] text-amber-800 leading-normal">
            Speak in full sentences! Your AI coach automatically detects grammar adjustments in real-time.
          </p>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col rounded-3xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
        {/* Chat Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 text-white shadow-sm shadow-brand-500/25">
                <Bot className="h-6 w-6" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  {selectedTopic.title}
                </h3>
                <Badge variant="brand">{selectedTopic.category}</Badge>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                AI Coach listening & correcting in real-time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setHistoryOpen(!historyOpen)}
              className="lg:hidden rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
              title="Toggle History"
            >
              <Clock className="h-4 w-4" />
            </button>
            <button
              onClick={() => setMessages(mockInitialMessages)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200/80 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/40">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-2xl ${
                  isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {/* Avatar */}
                <div className="shrink-0">
                  {isUser ? (
                    <img
                      src={mockUser.avatar}
                      alt="User"
                      className="h-8 w-8 rounded-full object-cover ring-2 ring-brand-100"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                </div>

                {/* Message Bubble */}
                <div className="space-y-1.5">
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      isUser
                        ? 'bg-gradient-to-tr from-brand-600 to-indigo-600 text-white shadow-sm shadow-brand-500/15'
                        : 'bg-white text-slate-800 border border-slate-200/80 shadow-sm'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>

                  {/* Corrections Pill (if any) */}
                  {msg.corrections && msg.corrections.length > 0 && (
                    <div className="rounded-xl bg-amber-50 p-2.5 border border-amber-200 text-xs space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-amber-900">
                        <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
                        AI Grammar Feedback:
                      </div>
                      {msg.corrections.map((corr, idx) => (
                        <div key={idx} className="text-amber-800">
                          <span className="line-through text-rose-500 mr-1">
                            "{corr.original}"
                          </span>
                          <span className="font-bold text-emerald-700">
                            → "{corr.corrected}"
                          </span>
                          <p className="text-[11px] text-amber-700/90 mt-0.5">
                            Rule: {corr.rule}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div
                    className={`flex items-center gap-2 text-[10px] text-slate-400 font-medium px-1 ${
                      isUser ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => {
                          // voice playback simulation
                          alert(`Reading out: "${msg.text.slice(0, 50)}..."`);
                        }}
                        className="hover:text-brand-600 transition-colors"
                        title="Listen to pronunciation"
                      >
                        <Volume2 className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* AI Thinking Animation */}
          {isThinking && (
            <div className="flex gap-3 mr-auto max-w-sm items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Bot className="h-4 w-4 animate-spin" />
              </div>
              <div className="rounded-2xl bg-white px-4 py-3 border border-slate-200 shadow-sm flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-brand-500 animate-bounce" />
                <span className="h-2 w-2 rounded-full bg-brand-500 animate-bounce [animation-delay:0.2s]" />
                <span className="h-2 w-2 rounded-full bg-brand-500 animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs text-slate-400 font-medium ml-1">Coach is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] shrink-0">
            Quick Prompts:
          </span>
          {[
            "Could you elaborate with an example?",
            "How can I sound more confident?",
            "What is a better word for 'good' here?",
            "Let's move to the next question."
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleQuickPrompt(prompt)}
              className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-600 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50/50 transition-all font-medium"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleRecording}
              className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-all ${
                isRecording
                  ? 'bg-rose-500 text-white border-rose-600 animate-pulse ring-4 ring-rose-200'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
              title={isRecording ? 'Stop Recording' : 'Voice Input (Simulated)'}
            >
              {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>

            <div className="relative flex-1">
              <textarea
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  isRecording
                    ? 'Listening to your speech...'
                    : 'Type your response or question in English... (Press Enter to send)'
                }
                className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200 transition-all"
              />
            </div>

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-sm shadow-brand-500/25 hover:bg-brand-700 disabled:opacity-40 disabled:hover:bg-brand-600 transition-all active:scale-95"
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-2 text-center text-[11px] text-slate-400">
            Coach tip: Type naturally. Your coach will respond and annotate grammar mistakes without interrupting your flow.
          </p>
        </div>
      </div>
    </div>
  );
}
