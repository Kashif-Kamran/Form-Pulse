#!/bin/bash

# Migration and Seeding Setup Script
echo "🚀 Form-Pulse Migration & Seeding Setup"
echo "======================================="

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found!"
    echo "📝 Please create a .env file with the following variables:"
    echo "   DATABASE_URL=mongodb://localhost:27017/formpulse"
    echo "   JWT_SECRET=your-jwt-secret-here"
    echo "   JWT_EXPIRES_IN=7d"
    echo "   PORT=3001"
    echo "   NODE_ENV=development"
    echo "   EMAIL_FROM=noreply@formpulse.com"
    echo "   EMAIL_CLIENT_PASSWORD=your-email-password"
    exit 1
fi

# Check if DATABASE_URL is set
if ! grep -q "DATABASE_URL" .env; then
    echo "❌ DATABASE_URL not found in .env file!"
    exit 1
fi

echo "✅ Environment configuration found"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the project
echo "🔨 Building the project..."
npm run build

# Run migrations
echo "🚀 Running migrations..."
npm run migrate

# Run seeders
echo "🌱 Running seeders..."
npm run seed

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "👤 Default Admin User:"
echo "   Email: admin@formpulse.com"
echo "   Password: Admin@123"
echo ""
echo "🔧 Available commands:"
echo "   npm run migration:create <name>  - Create new migration"
echo "   npm run migration:up             - Run migrations"
echo "   npm run seed                     - Run seeders"
echo "   npm run db:setup                 - Setup database"
echo "   npm run db:reset                 - Reset database"
echo ""
