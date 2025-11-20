# TaskAIgen – Customizable Tasks, Progress Handler, AI Plan Generator

*Frontend*

- Built with React.js
- Responsive design using TailwindCSS
- User cannot access the dashboard without login
- Search filters implemented in a unique way

- dependencies to install : 
   1. Axios
   2. framer-motion
   3. lucide-react
   4. react-icons
   5. recharts
   6. react, react-dom, react-router-dom


*Backend*

- Implemented with Node.js / Express
- Database: MongoDB
- Created APIs for:
    1. Authentication (signup/login, JWT-based authentication)
    2. Profile fetched and visible to the frontend
    3. CRUD operations for Categories and Tasks
    4. Update task status and progress (based on user’s consistency)
    5. Generate a 7-day plan using GenAI

- Dependencies to install:
  1. express

  2. mongoose

  3. bcryptjs

  4. jsonwebtoken

  5. cors

  6. dotenv

  7. body-parser

  8. cookie-parser

  9. node-cron

  8. @google/genai

  9. openai

  10. passport

# Environment Variables
- PORT  
- MONGO_URI  
- JWT_SECRET  
- CALLBACK_URL  
- FRONTEND_URL  
- BASE_URL  
- GEMINI_API_KEY  


*Dashboard Features*

- Sidebar with nested redirects:
   1. Profile  
   2. Calendar  
   3. Generate with AI  
   4. Categories  
   5. Workspace  
   6. Focus Mode  
   7. Logout

- Progress tracking, task summary  
- Category-wise tasks  
- Search and filter in workspace  
- Display user profile  
- Live date and time  
- Monthly and weekly calendar integrated

*Security & Scalability*

- Password hashing and token validation using bcrypt
- JWT authentication middleware
- Structured and modular code for easy scaling

***APIs Implemented***

User:
- POST  `/api/user/register`
- POST  `/api/user/login`
- DELETE `/api/user/:id`

Categories:
- GET  `/api/categories`
- POST `/api/categories`
- DELETE `/api/categories/:id`

Tasks:
- GET  `/api/todos`
- POST `/api/todos`
- GET  `/api/todos/category/:categoryId`
- PUT  `/api/todos/:id`
- DELETE `/api/todos/:id`
- PATCH `/api/todos/:id/status`   (update task status)

Plan Generator:
- POST `/api/ai/generate`

Other backend checks:
- Tracks `lastActiveDate`
- Adds progress daily
- Maintains task history logs




Frontend Setup
- git clone <repo-url>
- cd frontend
- npm  install
-  npm run dev

Backend setup

- cd backend
- npm install
- npm start
