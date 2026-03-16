# HireReady 🚀

An AI-powered interview preparation platform that analyzes your resume, self-description, and job description to generate personalized interview reports and optimized resumes.

---

## Features

- **AI Interview Report Generation** — Upload your resume PDF, provide a job description and self-description, and get a detailed AI-generated interview report including technical questions, behavioral questions, skill gaps, and a preparation plan.
- **Resume PDF Generation** — Generate a tailored resume PDF based on your interview report data.
- **Interview Report Management** — View all past interview reports or fetch a specific one by ID.
- **User Authentication** — Secure JWT-based authentication with protected routes.
- **File Upload Support** — Resume upload via `multipart/form-data`.

---

## Tech Stack

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (file uploads)
- pdf-parse (PDF text extraction)
- Anthropic / AI SDK (interview report generation)

**Frontend**
- React.js

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- An AI API key (Anthropic or equivalent)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/HireReady.git
   cd HireReady
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the `backend/` directory:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. **Start the backend**
   ```bash
   cd backend
   npm run dev
   ```

6. **Start the frontend**
   ```bash
   cd frontend
   npm run dev
   ```

---

## API Reference

### Auth Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login and get JWT token | Public |
| POST | `/api/auth/logout` | Logout and blacklist token | Private |

### Interview Routes
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/interview/` | Generate a new interview report | Private |
| GET | `/api/interview/` | Get all interview reports for logged-in user | Private |
| GET | `/api/interview/report/:interviewId` | Get a specific interview report by ID | Private |
| POST | `/api/interview/resume/pdf/:interviewReportId` | Generate resume PDF from an interview report | Private |

### POST `/api/interview/` — Request

`Content-Type: multipart/form-data`

| Field | Type | Description |
|-------|------|-------------|
| `resume` | File (PDF) | Your resume file |
| `selfDescription` | String | A brief description about yourself |
| `jobDescription` | String | The job description you're targeting |

### POST `/api/interview/` — Response

```json
{
  "message": "Interview report generated successfully.",
  "interviewReport": {
    "_id": "...",
    "user": "...",
    "selfDescription": "...",
    "jobDescription": "...",
    "technicalQuestions": [...],
    "behavioralQuestions": [...],
    "skillGaps": [...],
    "preparationPlan": [...],
    "createdAt": "..."
  }
}
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start backend with nodemon |
| `npm start` | Start backend in production |

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'feat: add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

## Author

Priyanshu Raj
