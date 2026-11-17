# TalkPulse AI — AI English Communication Coach

TalkPulse AI is an intelligent communication learning application designed to help students and professionals improve their English communication skills through conversation practice, real-time grammar corrections, interview preparation, and vocabulary acquisition.

---

## 🚀 Key Features

* **AI English Conversation Practice:** Natural roleplay dialogues across everyday and professional contexts.
* **Instant Grammar & Style Feedback:** Highlights mistakes, explains grammatical rules, and provides natural native rephrasings.
* **Interview Simulator:** Practice behavioral and technical interview questions with STAR method scoring.
* **Vocabulary Vault:** High-impact professional vocabulary flashcards with phonetic guides and spaced-repetition status tracking.
* **Progress & Mastery Analytics:** Visualized fluency trajectories, grammar error reduction distributions, and practice minutes using Recharts.
* **Personalized Coach Settings:** Customizable proficiency tiers (Beginner, Intermediate, Advanced) and feedback strictness (Gentle, Balanced, Strict).

---

## 🛠️ Tech Stack

### Frontend
* **React 19** + **Vite**
* **Tailwind CSS** (Custom typography & modern SaaS theme)
* **React Router DOM** (Single Page Application routing)
* **Recharts** (Interactive Area & Bar performance visualizations)
* **Lucide React** (Consistent UI iconography)

### Backend
* **Node.js** + **Express.js** (Modular RESTful API)
* **Security & Middleware:** Helmet, CORS, Express-Rate-Limit, Custom Request Validation
* **Architecture:** Modular routes, controllers, services, middleware, and config

---

## 📂 Project Architecture

```
commu-ai/
├── src/                           # React Frontend
│   ├── components/
│   │   ├── layout/                # Sidebar, Header, Layout
│   │   └── common/                # StatCard, Badge
│   ├── pages/                     # Dashboard, AIPractice, Grammar, Vocabulary, Interview, Progress, Settings
│   ├── data/                      # Mock Data
│   ├── App.jsx
│   └── main.jsx
│
├── backend/                       # Node.js + Express Backend
│   ├── src/
│   │   ├── config/                # Environment configuration
│   │   ├── controllers/           # HTTP Request Handlers
│   │   ├── services/              # Business Logic
│   │   ├── routes/                # REST API Endpoints
│   │   ├── middleware/            # Rate Limiter, Error Handler, Validators
│   │   ├── utils/                 # API Response Helpers & Logger
│   │   └── data/                  # In-Memory Store
│   ├── server.js                  # Backend Entrypoint
│   └── package.json
│
├── package.json                   # Frontend dependencies & root scripts
└── tailwind.config.js
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status & uptime |
| `GET` | `/api/users/profile` | Student profile, goals & streak |
| `GET` | `/api/practice/history` | Practice sessions history log |
| `POST` | `/api/practice/session` | Log a completed practice session |
| `POST` | `/api/grammar/check` | Analyze grammar, get explanations & examples |
| `GET` | `/api/vocabulary` | Get saved vocabulary with filters |
| `POST` | `/api/vocabulary` | Add new word to vocabulary bank |
| `POST` | `/api/interview/session` | Evaluate interview response (STAR & Clarity) |
| `GET` | `/api/progress/weekly` | Weekly fluency & accuracy trends |
| `GET` | `/api/progress/monthly` | Monthly progress trajectory |
| `POST` | `/api/chat` | AI conversational turn with grammar coaching |

---

## 💻 Getting Started

### Prerequisites
* **Node.js** (v18 or higher)
* **npm** (v9 or higher)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mohamedsuhail-Max/commu-ai-.git
   cd commu-ai-
   ```

2. **Install Frontend Dependencies:**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   cd ..
   ```

### Running the Application

* **Start Backend Server:**
  ```bash
  npm run backend
  # Server will run at http://localhost:5000
  ```

* **Start Frontend Client:**
  ```bash
  npm run dev
  # Application will be live at http://localhost:5173
  ```

---

## 🗺️ Roadmap
- [x] Responsive Frontend Dashboard, Practice, Grammar, Vocabulary, Interview, Progress, and Settings pages.
- [x] Modular Express.js Backend with Rate Limiting, Validation, and CORS.
- [ ] Supabase PostgreSQL database integration via Prisma ORM.
- [ ] Gemini API integration with native tool/function calling.
- [ ] Speech-to-Text and Text-to-Speech audio integration.
