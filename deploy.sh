#!/bin/bash

echo "🚀 Starting Taste of Thai deployment..."

# Stop existing containers
echo "📦 Stopping existing containers..."
docker-compose down

# Build and start containers
echo "🔨 Building and starting containers..."
docker-compose up -d --build

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Run database migrations
echo "🗄️ Running database migrations..."
docker-compose exec backend npx prisma migrate deploy

# Show container status
echo "📊 Container status:"
docker-compose ps

echo "✅ Deployment complete!"
echo "🌐 Frontend: http://localhost"
echo "🔗 Backend API: http://localhost:3000"