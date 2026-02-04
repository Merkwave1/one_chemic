🚀 OneChemic - Full Stack Application - HTTPS Access Guide
==============================================================

## ✅ Current Status
All services are running and operational on your server (46.224.186.76):

### Services:
- **Admin Dashboard**: http://46.224.186.76:8888
- **Public Website**: http://46.224.186.76:8889  
- **API Backend**: http://46.224.186.76:8890
- **Database**: PostgreSQL on 5440 (internal)

Admin Credentials:
- Username: admin
- Password: admin123

---

## 🔒 Option 1: HTTPS with Cloudflare Tunnel (FREE - RECOMMENDED)

Cloudflare Tunnel provides:
- ✓ Valid SSL/TLS certificates (no browser warnings)
- ✓ Works from anywhere (no domain needed)
- ✓ Automatic certificate renewal
- ✓ Safe tunnel (no ports exposed)
- ✓ Zero configuration needed

### Quick Setup:

1. **Install cloudflared** (if not already installed):
   ```bash
   curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-x86_64.tgz | tar xz
   sudo mv cloudflared /usr/local/bin/
   cloudflared --version
   ```

2. **Authenticate with Cloudflare**:
   ```bash
   cloudflared login
   ```
   - Opens browser to https://dash.cloudflare.com
   - Create free account if needed
   - Authorize and get token

3. **Create tunnel**:
   ```bash
   cloudflared tunnel create onechemic
   ```

4. **Update environment URLs** (optional - for local testing):
   Edit `docker-compose.yml` and update:
   - Admin NEXT_PUBLIC_API_URL to your tunnel URL
   - Frontend NEXT_PUBLIC_API_URL to your tunnel URL

5. **Start tunnel** in a new terminal:
   ```bash
   cd /home/nassar/projects/one_chemic
   cloudflared tunnel run --config tunnel-config.yml onechemic
   ```

6. **Route your subdomains** (if you have a Cloudflare domain):
   ```bash
   cloudflared tunnel route dns onechemic admin.yourdomain.com
   cloudflared tunnel route dns onechemic api.yourdomain.com
   cloudflared tunnel route dns onechemic onechemic.yourdomain.com
   ```

### Access:
```
https://admin.onechemic.local       (or your domain)
https://api.onechemic.local         (or your domain)
https://onechemic.onechemic.local   (or your domain)
```

---

## 🌐 Option 2: Use ngrok (FREE - Quick Alternative)

ngrok provides instant HTTPS with public URLs:

1. **Install ngrok**:
   https://ngrok.com/download

2. **Start tunnel**:
   ```bash
   ngrok http 8888 http 8889 http 8890
   ```

3. **Get public URLs with HTTPS**:
   ```
   https://[generated-id].ngrok.io
   https://[generated-id].ngrok.app
   ```

---

## 🏠 Option 3: Local Access (HTTP)

Access via your server IP address:

```
http://46.224.186.76:8888     (Admin Dashboard)
http://46.224.186.76:8889     (Public Website)
http://46.224.186.76:8890     (API)
```

Login credentials:
- Username: admin
- Password: admin123

---

## 📊 Available APIs

### Admin Dashboard
```
URL: /admin or port 8888
Login Required: Yes
Features: User management, settings, analytics
```

### Public Website
```
URL: / or port 8889
Login Required: No
Features: Product catalog, company info
```

### REST API Endpoints
```
Base URL: http://46.224.186.76:8890/api

Authentication Endpoints:
POST /user/login
  Body: {"userName": "admin", "password": "admin123"}
  Returns: JWT token

POST /user/register
  Body: {"userName": "...", "password": "..."}

Data Endpoints:
GET /product          - Get all products
GET /product/{id}     - Get specific product
GET /category         - Get product categories

(APIs require JWT token in Authorization header after login)
```

---

## 🐳 Docker Services

All services are managed with Docker Compose:

```bash
# View logs
docker compose logs -f

# View specific service
docker compose logs -f backend
docker compose logs -f admin
docker compose logs -f onechemic

# Restart all services
docker compose restart

# Stop all services
docker compose down

# Start services
docker compose up -d
```

---

## 🔌 Test API Connectivity

### Test Login:
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"userName":"admin","password":"admin123"}' \
  http://46.224.186.76:8890/api/user/login
```

### Test Products Endpoint:
```bash
curl http://46.224.186.76:8890/api/product
```

### Test Admin Page:
```bash
curl http://46.224.186.76:8888
```

---

## 🔧 Troubleshooting

### Services not responding?
```bash
docker compose ps
docker compose logs
```

### API authentication issues?
- Ensure username is "admin" and password is "admin123"
- Check database: `docker compose logs postgres`

### Cloudflare Tunnel issues?
```bash
cloudflared tunnel list
cloudflared tunnel delete onechemic
cloudflared tunnel create onechemic
```

---

## 📝 Important Notes

1. **Production Deployment**: For production, use:
   - A registered domain (not .local)
   - Cloudflare DNS management
   - Proper SSL certificates via Let's Encrypt through Caddy
   - Environment variables for sensitive data
   - Firewall rules limiting access

2. **Database Credentials**: Currently hardcoded for development
   - User: postgres
   - Password: admin
   - Secure these in production!

3. **JWT Secret**: Change in production
   - Current: RUHQ6zJJDLWlWgdA6ReAezpYxDvfNsyv
   - Located in Program.cs

4. **CORS Settings**: Currently set to "AllowAll"
   - Restrict in production to specific origins

---

## 🆘 Support

For issues:
1. Check service logs: `docker compose logs`
2. Verify all containers running: `docker compose ps`
3. Test connectivity: `curl http://localhost:8890/api/product`
4. Check Cloudflared status: `cloudflared status` (if using tunnel)

---

Generated: 2024
OneChemic Full Stack Application

