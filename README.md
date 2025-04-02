# Reach JS-Softuni-Project

A modern photo-sharing web application built with React and Node.js. Users can register, log in, upload and browse photos, create galleries, like and favorite photos, and leave comments — all within a sleek, responsive SPA.

---

## 🚀 Features

- Upload and view high-quality photos  
- Create custom photo galleries  
- Comment on photos (with delete option for your own comments)  
- Like and favorite photos  
- Search functionality for photos  
- Responsive design with mobile dropdown menu  
- Login/Register flow with JWT authentication  
- Toast notifications for feedback  
- Smooth UI animations using Framer Motion  

---

## 🛠️ Tech Stack

### Frontend
- **React**
- **React Router** – Client-side routing
- **Tailwind CSS** – Utility-first styling
- **Zustand** – State management (modals, login modal)
- **UserContext** – Manages current user state
- **Framer Motion** – UI animations
- **React Toastify** – Notifications

### Backend
- **Node.js** + **Express**
- **MongoDB** – Data storage
- **Cloudinary** – Image uploads
- **JWT** – Authentication

### Hosting
- **Frontend** – Firebase Hosting  
- **Backend** – Google Cloud Run  

---

## 🧪 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/reach-js-softuni-project.git
cd reach-js-softuni-project
```

### 2. Install Dependencies (both frontend and backend)

```bash
npm install
```

### 3. Set Up Environment Variables

#### 🔒 Backend `.env`
```
PORT=5000
MONGO_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
```

#### 🔑 Frontend `.env`
```
VITE_API_URL=https://your-backend-url.com
```

> These should already be correctly set by default in the deployed version.

### 4. Run in Development Mode

In two terminals, for both frontend and backend:

```bash
npm run dev
```

---

## 🌐 Deployed App

[https://my-test-project-25338.web.app/](https://my-test-project-25338.web.app/)
