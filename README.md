# 📋 TaskTracker - Full Stack Task Management App

A modern, responsive task management application built with React, Node.js, Express, and MongoDB. Features user authentication, real-time task management, and an intuitive UI/UX.

![TaskTracker Demo](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)

## ✨ Features

### 🔐 Authentication & Security
- **JWT-based authentication** with secure token management
- **Password hashing** using bcrypt
- **Protected routes** and API endpoints
- **User session management** with automatic logout

### 📝 Task Management
- **Full CRUD operations** - Create, Read, Update, Delete tasks
- **Task status tracking** - Pending/Completed with toggle functionality
- **Priority levels** - Low, Medium, High with color-coded badges
- **Due date management** with overdue indicators
- **Task filtering** by status (All, Pending, Completed)
- **Task statistics** dashboard with completion rates

### 🎨 Modern UI/UX
- **Responsive design** - Works on desktop, tablet, and mobile
- **Modern gradient background** with glassmorphism effects
- **Intuitive navigation** with clean, minimal interface
- **Loading states** and error handling
- **Form validation** with real-time feedback
- **Empty state messages** for better user experience
- **Smooth animations** and transitions

### 🚀 Technical Features
- **RESTful API architecture** with proper HTTP methods
- **MongoDB integration** with Mongoose ODM
- **Real-time updates** without page refresh
- **Error handling** with user-friendly messages
- **Input validation** on both frontend and backend
- **CORS configuration** for cross-origin requests

## 🏗️ Architecture

```
task-tracker-backend/
├── Backend/                 # Node.js/Express API
│   ├── middleware/         # Authentication middleware
│   ├── models/            # MongoDB schemas (User, Task)
│   ├── routes/            # API routes (auth, tasks)
│   ├── server.js          # Express server setup
│   └── package.json       # Backend dependencies
├── Frontend/              # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── TaskList.js
│   │   │   ├── TaskForm.js
│   │   │   ├── Login.js
│   │   │   └── Register.js
│   │   ├── App.js         # Main app component
│   │   ├── App.css        # Global styles
│   │   └── api.js         # API configuration
│   └── package.json       # Frontend dependencies
├── docker-compose.yml     # Docker deployment
├── DEPLOYMENT.md          # Deployment guide
└── README.md             # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- Git

### Local Development

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd task-tracker-backend
```

2. **Setup Backend:**
```bash
cd Backend
npm install
```

3. **Create Backend environment file:**
```bash
# Create .env file in Backend directory
MONGO_URI=mongodb://localhost:27017/task-tracker
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_EXPIRES_IN=7d
PORT=5000
```

4. **Start Backend server:**
```bash
npm run dev  # Development mode with auto-restart
# or
npm start    # Production mode
```

5. **Setup Frontend:**
```bash
cd ../Frontend
npm install
```

6. **Create Frontend environment file:**
```bash
# Create .env file in Frontend directory
REACT_APP_API_URL=http://localhost:5000/api
```

7. **Start Frontend development server:**
```bash
npm start
```

8. **Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

