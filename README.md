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

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)
```bash
# Clone and setup
git clone <your-repo-url>
cd task-tracker-backend

# Create environment files (see Quick Start section)

# Deploy with Docker Compose
docker-compose up -d
```

### Manual Docker Deployment
```bash
# Backend
cd Backend
docker build -t task-tracker-backend .
docker run -p 5000:5000 --env-file .env task-tracker-backend

# Frontend
cd Frontend
docker build -t task-tracker-frontend .
docker run -p 3000:3000 task-tracker-frontend
```

## 📡 API Documentation

### Authentication Endpoints
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Task Endpoints
```http
# Get all tasks (with optional status filter)
GET /api/tasks?status=Completed
Authorization: Bearer <jwt-token>

# Get single task
GET /api/tasks/:id
Authorization: Bearer <jwt-token>

# Create new task
POST /api/tasks
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the task tracker project",
  "dueDate": "2024-01-15",
  "priority": "High",
  "status": "Pending"
}

# Update task
PUT /api/tasks/:id
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "Updated task title",
  "status": "Completed"
}

# Delete task
DELETE /api/tasks/:id
Authorization: Bearer <jwt-token>
```

## 🎯 Usage Guide

### Getting Started
1. **Register** a new account or **login** with existing credentials
2. **Create your first task** by clicking the "+ New Task" button
3. **Fill in task details:**
   - Title (required)
   - Description (optional)
   - Due date (optional)
   - Priority level (Low/Medium/High)
4. **Manage tasks:**
   - Toggle completion status
   - Edit task details
   - Delete tasks
   - Filter by status

### Dashboard Features
- **Task Statistics**: View total, pending, completed tasks and completion rate
- **Status Filtering**: Filter tasks by All, Pending, or Completed
- **Priority Indicators**: Color-coded priority badges
- **Due Date Alerts**: Visual indicators for overdue tasks
- **Responsive Grid**: Tasks displayed in a responsive card layout

## 🛠️ Technology Stack

### Frontend
- **React 18.2.0** - Modern UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with gradients and animations

### Backend
- **Node.js 18+** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Development Tools
- **Nodemon** - Development server with auto-restart
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
MONGO_URI=mongodb://localhost:27017/task-tracker
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=development
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### MongoDB Configuration
- **Local MongoDB**: `mongodb://localhost:27017/task-tracker`
- **MongoDB Atlas**: `mongodb+srv://username:password@cluster.mongodb.net/task-tracker`

## 🚀 Deployment Options

### Cloud Platforms
- **Render.com** - Easy deployment with automatic builds
- **Railway** - Full-stack deployment platform
- **Vercel** - Frontend deployment with serverless functions
- **Netlify** - Static site hosting
- **Heroku** - Container-based deployment
- **AWS** - Enterprise-grade cloud platform

### Docker Deployment
- **Docker Compose** - Local development and production
- **Kubernetes** - Container orchestration
- **Docker Swarm** - Container clustering

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Task creation, editing, and deletion
- [ ] Task status toggling
- [ ] Task filtering by status
- [ ] Responsive design on different devices
- [ ] Error handling and validation
- [ ] Authentication token management

### API Testing
Use tools like Postman or curl to test API endpoints:
```bash
# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check connection string format
- Verify network access

**CORS Errors:**
- Check backend CORS configuration
- Verify frontend URL is allowed

**Authentication Issues:**
- Check JWT secret configuration
- Verify token expiration settings
- Clear localStorage and try again

**Build Errors:**
- Ensure Node.js version compatibility
- Clear node_modules and reinstall
- Check for missing dependencies

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the deployment guide

## 🎉 Acknowledgments

- React team for the amazing framework
- Express.js for the robust backend framework
- MongoDB for the flexible database solution
- The open-source community for inspiration and tools

---

**Made with ❤️ for better task management**
