# 🐎 Form-Pulse

> A comprehensive farm management system for livestock operations, featuring diet planning, health monitoring, and inventory management.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

## 🌟 Overview

Form-Pulse is a modern, full-stack farm management application designed to streamline livestock operations. Built with a focus on user experience and scalability, it provides comprehensive tools for managing animal health, diet planning, feed inventory, and more.

### 🎯 Key Features

- **🍽️ Diet Management**: Create and manage comprehensive diet plans for animals
- **🏥 Health Monitoring**: Track animal health records and vaccination schedules
- **📦 Inventory Management**: Monitor feed inventory with real-time stock tracking
- **👥 User Management**: Role-based access control for different user types
- **📊 Dashboard**: Comprehensive overview of farm operations
- **🔐 Authentication**: Secure JWT-based authentication with OTP verification

### 👤 User Roles

- **🩺 Veterinarian**: Manage animal health records and medical treatments
- **🥗 Nutritionist**: Create and modify diet plans for optimal animal nutrition
- **👷 Caretaker**: Handle daily operations, feed inventory, and routine care
- **👨‍💼 Admin**: Full system access and user management

## 🏗️ Architecture

This project is built as a modern monorepo using **Turborepo** with the following structure:

```
form-pulse/
├── apps/
│   ├── web/          # React frontend (Vite + TypeScript)
│   └── server/       # NestJS backend API
├── packages/
│   ├── shared/       # Shared types and utilities
│   ├── eslint-config/# ESLint configurations
│   └── typescript-config/ # TypeScript configurations
└── docs/            # Documentation
```

### 🛠️ Tech Stack

#### Frontend (`/apps/web`)
- **⚛️ React 18** - Modern React with hooks and concurrent features
- **⚡ Vite** - Fast build tool and dev server
- **🎨 Tailwind CSS** - Utility-first CSS framework
- **🧩 Radix UI** - Accessible component primitives
- **📋 React Hook Form** - Performant forms with validation
- **🔄 TanStack Query** - Data fetching and state management
- **🧭 React Router** - Client-side routing
- **🔗 Zod** - TypeScript-first schema validation

#### Backend (`/apps/server`)
- **🚀 NestJS** - Progressive Node.js framework
- **🍃 MongoDB** - NoSQL database with Mongoose ODM
- **🔐 JWT** - JSON Web Token authentication
- **📧 Email Integration** - OTP-based email verification
- **🛡️ Guards & Decorators** - Role-based access control
- **📝 Swagger/OpenAPI** - API documentation

#### Shared (`/packages/shared`)
- **📘 TypeScript** - Shared types and interfaces
- **🔄 Common utilities** - Reusable functions and constants

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **Yarn** (recommended) or npm
- **MongoDB** instance (local or cloud)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Form-Pulse
```

2. **Install dependencies**
```bash
yarn install
# or
npm install
```

3. **Environment setup**
```bash
# Copy environment template
cp apps/server/.env.example apps/server/.env

# Update the .env file with your configuration:
# - MongoDB connection string
# - JWT secrets
# - Email service credentials
```

4. **Start development servers**
```bash
# Start both frontend and backend
yarn dev

# Or start individually:
yarn dev:web     # Frontend only (http://localhost:4000)
yarn dev:server  # Backend only (http://localhost:3001)
```

### 🌐 Access the Application

- **Frontend**: http://localhost:4000
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api/docs (when available)

## 📝 Available Scripts

### Root Level
```bash
yarn dev          # Start all apps in development mode
yarn build        # Build all apps for production
yarn lint         # Run ESLint across all packages
yarn format       # Format code with Prettier
```

### Frontend (`apps/web`)
```bash
yarn dev          # Start Vite dev server
yarn build        # Build for production
yarn preview      # Preview production build
yarn lint         # Run ESLint
```

### Backend (`apps/server`)
```bash
yarn dev          # Start NestJS in watch mode
yarn build        # Build for production
yarn start:prod   # Start production server
yarn test         # Run unit tests
yarn test:e2e     # Run end-to-end tests
```

## 🎮 Usage Guide

### Getting Started

1. **Register an account** with email verification
2. **Choose your role** during registration (Veterinarian, Nutritionist, Caretaker)
3. **Complete OTP verification** via email
4. **Access role-specific features** based on your permissions

### Core Workflows

#### 🍽️ Diet Management (Nutritionist)
1. Navigate to **Diet Management**
2. Click **"Create New Diet Plan"**
3. Select target animal and caretaker
4. Configure feeding schedule and recipes
5. Save and monitor plan execution

#### 🏥 Health Monitoring (Veterinarian)
1. Go to **Health Monitoring**
2. Create health records for animals
3. Schedule vaccinations and treatments
4. Track health metrics over time

#### 📦 Inventory Management (Caretaker)
1. Access **Feed Inventory**
2. Add new feed items with nutritional data
3. Update stock levels as needed
4. Monitor low-stock alerts

## 🔧 Configuration

### Environment Variables

#### Backend (`apps/server/.env`)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/form-pulse

# Authentication
JWT_ACCESS_SECRET=your-jwt-access-secret
JWT_REFRESH_SECRET=your-jwt-refresh-secret
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Email Service
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Application
PORT=3001
NODE_ENV=development
```

## 🧪 Testing

```bash
# Run all tests
yarn test

# Backend tests
cd apps/server
yarn test        # Unit tests
yarn test:e2e    # End-to-end tests
yarn test:cov    # Coverage report

# Frontend tests (when available)
cd apps/web
yarn test
```

## 📦 Deployment

### Production Build

```bash
# Build all applications
yarn build

# The built files will be in:
# - apps/web/dist (frontend)
# - apps/server/dist (backend)
```

### Docker Deployment (Future)

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build individual containers
docker build -f apps/web/Dockerfile -t form-pulse-web .
docker build -f apps/server/Dockerfile -t form-pulse-server .
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow **TypeScript** best practices
- Use **ESLint** and **Prettier** for code formatting
- Write **tests** for new features
- Update **documentation** as needed
- Follow **conventional commit** messages

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- **Issues**: [GitHub Issues](https://github.com/your-username/form-pulse/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/form-pulse/discussions)
- **Email**: support@form-pulse.com

## 🗺️ Roadmap

### Upcoming Features

- [ ] **📱 Mobile App** - React Native application
- [ ] **📊 Analytics Dashboard** - Advanced reporting and insights
- [ ] **🔔 Real-time Notifications** - WebSocket-based alerts
- [ ] **📋 Task Management** - Daily task scheduling and tracking
- [ ] **🌐 Multi-language Support** - Internationalization
- [ ] **☁️ Cloud Integration** - AWS/Azure deployment options

### Recent Updates

- [x] **✅ Role-based Access Control** - Granular permissions system
- [x] **✅ Diet Plan Management** - Complete CRUD operations
- [x] **✅ Inventory Tracking** - Real-time stock management
- [x] **✅ Health Records** - Comprehensive health monitoring

---

<div align="center">
  <p>Built with ❤️ for modern farm management</p>
  <p>
    <a href="#-form-pulse">Back to top</a>
  </p>
</div>
