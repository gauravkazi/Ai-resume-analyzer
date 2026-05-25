# AI Resume Analyzer

I built this project to solve a real problem — most people have no idea why their resume keeps getting rejected. Turns out, a lot of companies use ATS (Applicant Tracking Systems) to filter resumes before a human ever sees them. This tool helps you understand how your resume performs against that system.

You upload your resume as a PDF, and the app analyzes it using Google Gemini AI and gives you an ATS score, tells you what skills you're missing, and gives you actual feedback you can act on.

## What it does

- Register and log in securely (JWT-based auth)
- Upload your resume as a PDF
- Get an ATS score + skill analysis + suggestions from Gemini AI
- Come back later and check your previous uploads and scores

## Tech stack

**Frontend** — React + Vite, React Router, Axios

**Backend** — Node.js, Express, MongoDB, Mongoose, JWT, Multer

**AI** — Google Gemini API via `@google/generative-ai`

## Running it locally 

You'll need Node.js, MongoDB, and a Gemini API key. Get the key from [Google AI Studio](https://aistudio.google.com/app/apikey) — it's free.

**Clone the repo**

```bash
git clone https://github.com/yourusername/ai-resume-analyzer.git
cd ai-resume-analyzer
```

**Set up the backend**

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder and add:

PORT=5001
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_key


Then start it:

```bash
npm run dev
# runs on http://localhost:5001
```

**Set up the frontend**

```bash
cd frontend
npm install
npm run dev
# runs on http://localhost:5173
```


## API endpoints

**Auth**

```
POST /api/auth/register   → create account
POST /api/auth/login      → login, returns JWT token
```

**Resume**

```
POST /api/resume/upload   → upload PDF (auth required)
GET  /api/resume/history  → get past uploads and scores (auth required)
```

Protected routes need this header:
```
Authorization: Bearer <token>
```


## challenges I ran into while building this

**CORS issues** — fixed by adding `app.use(cors())` in server.js. Obvious in hindsight.

**Gemini model name** — kept getting "model not found" errors. Use `gemini-1.5-flash-latest`, not the older names.

**API key not loading** — make sure `dotenv.config()` is at the very top of server.js, before any imports that use `process.env`.


## What I want to add next

- Match your resume against a specific job description
- A proper resume builder inside the app
- Charts showing your score improvement over time
- Dark mode
- Maybe Docker support for easier deployment


## Author

Built by **Gaurav Thapa**