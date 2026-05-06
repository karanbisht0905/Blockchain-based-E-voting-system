# Blockchain E-Voting System - Frontend

A modern, creative frontend for a blockchain-based electronic voting system with separate authentication portals for users and administrators.

## Features

- 🎨 **Creative Modern UI** - Beautiful glassmorphism design with gradient animations
- 👤 **User Authentication** - Sign up and login for voters
- 🛡️ **Admin Authentication** - Separate admin portal with sign up and login
- 🗳️ **Voting Interface** - User-friendly voting dashboard
- 📊 **Admin Dashboard** - Manage elections, create new ones, and view results
- 🔒 **Protected Routes** - Role-based access control
- 📱 **Responsive Design** - Works on all devices

## Tech Stack

- **React 18** - UI library
- **React Router v6** - Navigation and routing
- **Vite** - Build tool and dev server
- **CSS3** - Modern styling with glassmorphism effects
- **Context API** - State management for authentication

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

5. **Package project for distribution:**
   ```bash
   # Windows
   npm run package:win
   
   # Linux/Mac
   npm run package:unix
   ```
   This creates a `blockchain-e-voting-frontend-complete.zip` file with all source code.

## Project Structure

```
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx    # Route protection component
│   ├── context/
│   │   └── AuthContext.jsx        # Authentication context
│   ├── pages/
│   │   ├── Home.jsx               # Landing page
│   │   ├── UserLogin.jsx          # User login page
│   │   ├── UserSignup.jsx         # User signup page
│   │   ├── AdminLogin.jsx         # Admin login page
│   │   ├── AdminSignup.jsx        # Admin signup page
│   │   ├── UserDashboard.jsx      # User voting dashboard
│   │   ├── AdminDashboard.jsx     # Admin management dashboard
│   │   ├── Auth.css               # Authentication page styles
│   │   ├── Dashboard.css          # Dashboard styles
│   │   └── Home.css               # Home page styles
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Usage

### For Users

1. Navigate to the home page
2. Click "Sign Up" in the User Portal section
3. Fill in your details including wallet address
4. Login and access the voting dashboard
5. Cast your vote in active elections

### For Admins

1. Navigate to the home page
2. Click "Sign Up" in the Admin Portal section
3. Fill in admin details with authorization key
4. Login to access the admin dashboard
5. Create new elections, manage existing ones, and view results

## Design Features

- **Glassmorphism UI** - Modern frosted glass effect
- **Animated Gradients** - Dynamic background animations
- **Smooth Transitions** - Elegant hover and interaction effects
- **Responsive Layout** - Mobile-first design approach
- **Color Scheme** - Purple/blue gradient theme

## Notes

- This is a **frontend-only** implementation
- Authentication is currently simulated (localStorage)
- Voting actions are simulated (alerts)
- Replace authentication and voting logic with actual blockchain integration
- Connect to your blockchain backend/API for real functionality

## Future Integration

To integrate with a blockchain backend:

1. Replace authentication logic in `AuthContext.jsx`
2. Connect voting functions to smart contract calls
3. Replace mock data with blockchain queries
4. Add Web3 wallet integration (MetaMask, etc.)
5. Implement transaction signing and verification

## License

This project is open source and available for use.

