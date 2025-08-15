# Form-Pulse Docker Setup

This document explains how to run the Form-Pulse application using Docker and Docker Compose.

## Prerequisites

- Docker Engine 20.10+
- Docker Compose 2.0+

## Project Structure

```
Form-Pulse/
├── apps/
│   ├── server/          # NestJS Backend API
│   └── web/             # React Frontend
├── packages/
│   ├── shared/          # Shared types and utilities
│   ├── typescript-config/
│   └── eslint-config/
├── docker-compose.yml      # Production setup
├── docker-compose.dev.yml  # Development setup
└── mongo-init.js          # MongoDB initialization
```

## Quick Start

### Production Mode

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Form-Pulse
   ```

2. **Start all services:**
   ```bash
   docker-compose up -d
   ```

3. **Access the application:**
   - Frontend: http://localhost:80
   - Backend API: http://localhost:3001
   - MongoDB: localhost:27017

### Development Mode

1. **Start development environment:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **Access the application:**
   - Frontend: http://localhost:4000 (with hot reload)
   - Backend API: http://localhost:3001 (with hot reload)
   - MongoDB: localhost:27017

## Services

### MongoDB
- **Image:** mongo:7.0
- **Port:** 27017
- **Database:** form-pulse
- **Credentials:** root/password

### Backend API (NestJS)
- **Port:** 3001
- **Environment:** Node.js 18
- **Features:** Hot reload in development mode

### Frontend Web (React + Vite)
- **Port:** 4000 (dev) / 80 (prod)
- **Environment:** Node.js 18
- **Features:** Hot reload in development mode

## Environment Variables

### Backend (.env)
```bash
NODE_ENV=development
PORT=3001
DATABASE_URL=mongodb://root:password@mongodb:27017/form-pulse?authSource=admin
JWT_SECRET=your-super-secret-jwt-key-here
JWT_ACCESS_SECRET=your-super-secret-jwt-access-key-here
JWT_REFRESH_SECRET=your-super-secret-jwt-refresh-key-here
JWT_EXPIRES_IN=2d
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_FROM=your-email@gmail.com
EMAIL_CLIENT_PASSWORD=your-app-password
```

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:3001
```

## Commands

### Building Images
```bash
# Build all images
docker-compose build

# Build specific service
docker-compose build api
docker-compose build web
```

### Managing Services
```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f
docker-compose logs -f api
docker-compose logs -f web

# Restart specific service
docker-compose restart api
```

### Development Commands
```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# Stop development environment
docker-compose -f docker-compose.dev.yml down

# View development logs
docker-compose -f docker-compose.dev.yml logs -f
```

### Database Management
```bash
# Access MongoDB shell
docker exec -it form-pulse-mongodb-dev mongosh -u root -p password

# Backup database
docker exec form-pulse-mongodb-dev mongodump --username root --password password --authenticationDatabase admin --db form-pulse --out /backup

# Restore database
docker exec form-pulse-mongodb-dev mongorestore --username root --password password --authenticationDatabase admin --db form-pulse /backup/form-pulse
```

## Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Check which process is using the port
   lsof -i :3001
   lsof -i :4000
   lsof -i :27017
   
   # Kill the process or change ports in docker-compose.yml
   ```

2. **Shared package not building:**
   ```bash
   # Rebuild with no cache
   docker-compose build --no-cache
   ```

3. **MongoDB connection issues:**
   ```bash
   # Check MongoDB logs
   docker-compose logs mongodb
   
   # Restart MongoDB
   docker-compose restart mongodb
   ```

4. **File permission issues (Linux/Mac):**
   ```bash
   # Fix node_modules permissions
   sudo chown -R $USER:$USER node_modules
   ```

### Logs and Debugging
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f api
docker-compose logs -f web
docker-compose logs -f mongodb

# Execute shell in container
docker exec -it form-pulse-api-dev sh
docker exec -it form-pulse-web-dev sh
```

## Production Deployment

### Security Considerations

1. **Change default passwords:**
   - Update MongoDB credentials
   - Generate secure JWT secrets
   - Use proper email credentials

2. **Environment variables:**
   - Use Docker secrets or external secret management
   - Never commit sensitive data to version control

3. **Reverse proxy:**
   Consider using nginx or traefik as a reverse proxy for SSL termination

### Performance Optimization

1. **Multi-stage builds:** Already implemented in Dockerfiles
2. **Layer caching:** Optimized package.json copying
3. **Resource limits:** Add memory and CPU limits in production

## Monitoring

Consider adding monitoring services:
```yaml
# Add to docker-compose.yml
monitoring:
  image: prom/prometheus
  ports:
    - "9090:9090"
```

## Backup Strategy

1. **Database backups:** Use MongoDB dump/restore
2. **Code backups:** Git repository
3. **Container images:** Push to container registry
