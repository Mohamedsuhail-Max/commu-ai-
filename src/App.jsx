import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import AIPractice from './pages/AIPractice';
import GrammarPractice from './pages/GrammarPractice';
import Vocabulary from './pages/Vocabulary';
import InterviewPractice from './pages/InterviewPractice';
import Progress from './pages/Progress';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="practice" element={<AIPractice />} />
          <Route path="grammar" element={<GrammarPractice />} />
          <Route path="vocabulary" element={<Vocabulary />} />
          <Route path="interview" element={<InterviewPractice />} />
          <Route path="progress" element={<Progress />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
