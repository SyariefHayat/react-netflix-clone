# Netflix Clone (MERN & Firebase)

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![React](https://img.shields.io/badge/React-18.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-16.x-green)
![Firebase](https://img.shields.io/badge/Firebase-Auth-orange)

Netflix Clone is a web application that replicates the core features of Netflix, built with the MERN stack (MongoDB, Express, React, Node.js) and Firebase for user authentication. It allows users to browse and stream movies, manage their profiles, and much more.

[Visit the website](https://react-netflix-clone-sand.vercel.app/)

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Authentication** using Firebase (Login, Register)
- **Movie and TV Show Listings** with dynamic data from the backend
- **Watchlist Feature** for managing favorite shows and movies
- **Profile Management** for multiple users
- **Responsive Design** for mobile and desktop users

## Tech Stack
- **Frontend**: React (Vite)
- **Backend**: Node.js, Express
- **Database**: MongoDB (for storing user watchlists, profiles, etc.)
- **Authentication**: Firebase Authentication (for secure login/signup)
- **Hosting**: Vercel 
- **Styling**: Tailwind CSS

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/username/netflix-clone.git
   cd netflix-clone

2. Install dependencies for both backend and frontend:
   - frontend
   cd react-netflix
   npm install

   - backend
   cd api-netflix
   npm install

3. Set up Firebase for authentication:
   Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   Enable Email/Password Authentication.
   Obtain the Firebase configuration object and store it in .env file in the frontend.

## Environment Variables
1. Create a .env file in the frontend(react-netflix):
   VITE_FIREBASE_API_KEY=your-firebase-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-firebase-project-id

2. Create a .env file in the backend(api-netflix):
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   PORT=3000

## Usage
1. Running the frontend:
   cd react-netflix
   npm run dev

2. Running the backend:
   cd api-netflix
   npm start

The frontend will be available at http://localhost:5173 and the backend API at http://localhost:3000.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repo
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.