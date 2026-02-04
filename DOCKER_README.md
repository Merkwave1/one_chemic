# OneChemic - Dockerized Full Stack Application

This is a complete dockerized setup for the OneChemic project consisting of:

- **PostgreSQL Database** - Data storage with automatic initialization
- **Backend API** - .NET 9 REST API with Entity Framework Core
- **Admin Dashboard** - Next.js admin panel for managing products
- **OneChemic Website** - Next.js public-facing website

## 🌐 Live Links (Access from Anywhere)

| Service | URL |
|---------|-----|
| **Admin Dashboard** | http://46.224.186.76:3000 |
| **OneChemic Website** | http://46.224.186.76:3001 |
| **Backend API** | http://46.224.186.76:5224 |
| **API Products** | http://46.224.186.76:5224/api/product |

## Quick Start

### Prerequisites

- Docker & Docker Compose installed
- Ports 3000, 3001, 5224, and 5432 available

### Start All Services

```bash
# Make the script executable
chmod +x start.sh

# Start all services (builds if needed)
./start.sh --build

# Or use docker-compose directly
docker-compose up --build -d
```

### Access the Applications

| Service | URL | Description |
|---------|-----|-------------|
| Admin Dashboard | http://localhost:3000 | Product management interface |
| OneChemic Website | http://localhost:3001 | Public website |
| Backend API | http://localhost:5224 | REST API |
| PostgreSQL | localhost:5432 | Database (user: postgres, pass: admin) |

### Stop All Services

```bash
./start.sh --down

# Or use docker-compose directly
docker-compose down
```

### View Logs

```bash
./start.sh --logs

# Or for specific service
docker-compose logs -f backend
docker-compose logs -f admin
docker-compose logs -f onechemic
```

## Configuration

### Environment Variables

The following environment variables can be configured in `docker-compose.yml`:

#### Database
- `POSTGRES_DB`: Database name (default: one_chemic)
- `POSTGRES_USER`: Database user (default: postgres)
- `POSTGRES_PASSWORD`: Database password (default: admin)

#### Backend
- `ConnectionStrings__DefaultConnection`: PostgreSQL connection string
- `Jwt__Key`: JWT signing key
- `Jwt__Issuer`: JWT issuer
- `Jwt__Audience`: JWT audience

#### Frontends
- `NEXT_PUBLIC_API_URL`: Backend API URL (set during build)

## Production Deployment

For production deployment, update the `docker-compose.yml`:

1. Change database password
2. Update JWT key
3. Set `NEXT_PUBLIC_API_URL` to your production API URL
4. Consider using a reverse proxy (nginx/caddy) for SSL

### Example Production docker-compose override:

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  admin:
    build:
      args:
        - NEXT_PUBLIC_API_URL=https://api.yourdomain.com
  
  onechemic:
    build:
      args:
        - NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

Run with:
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

## API Endpoints

### Products
- `GET /api/product` - Get all products
- `GET /api/product/{id}` - Get product by ID
- `POST /api/product` - Create product (auth required)
- `PUT /api/product/{id}` - Update product (auth required)
- `DELETE /api/product/{id}` - Delete product (auth required)

### Authentication
- `POST /api/user/login` - User login
- `POST /api/user/register` - User registration

## Troubleshooting

### Database connection issues
If the backend can't connect to the database, the app will retry automatically for up to 60 seconds.

```bash
# Check database logs
docker-compose logs postgres

# Restart just the database
docker-compose restart postgres
```

### Frontend build issues
If frontend builds fail, try clearing the cache:

```bash
docker-compose down
docker system prune -f
docker-compose up --build -d
```

### View container status
```bash
docker-compose ps
```
