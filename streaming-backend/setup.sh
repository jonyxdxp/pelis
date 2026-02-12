#!/bin/bash

# Streaming Backend Setup Script

echo "🚀 Setting up Streaming Backend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment file
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please update .env with your database credentials"
fi

# Check if Docker is available
if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
    echo "🐳 Docker detected. Starting PostgreSQL..."
    docker-compose up -d postgres
    
    # Wait for PostgreSQL to be ready
    echo "⏳ Waiting for PostgreSQL..."
    sleep 5
    
    until docker-compose exec -T postgres pg_isready -U streaming_user -d streaming_db > /dev/null 2>&1; do
        echo "⏳ Waiting for PostgreSQL to be ready..."
        sleep 2
    done
    
    echo "✅ PostgreSQL is ready"
else
    echo "⚠️  Docker not found. Please ensure PostgreSQL is running and update DATABASE_URL in .env"
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run migrations
echo "🗄️  Running database migrations..."
npx prisma migrate dev --name init

# Seed database
echo "🌱 Seeding database..."
npm run db:seed

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 Start the server with:"
echo "   npm run dev"
echo ""
echo "📚 API will be available at:"
echo "   http://localhost:3000"
echo ""
echo "💚 Health check:"
echo "   http://localhost:3000/health"
echo ""
echo "📖 API Documentation:"
echo "   See README.md for endpoint details"
