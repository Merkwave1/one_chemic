#!/bin/bash
# OneChemic Full Redeploy + Cloudflare Tunnel Setup
# Run this script to bring everything up fresh with new tunnel URLs

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
info()    { echo -e "${BLUE}[i]${NC} $1"; }
success() { echo -e "${GREEN}[✓]${NC} $1"; }
warn()    { echo -e "${YELLOW}[!]${NC} $1"; }

echo ""
echo "========================================"
echo "   OneChemic Redeploy + Cloudflare"
echo "========================================"
echo ""

# Kill any existing onechemic tunnels
info "Stopping existing tunnels..."
pkill -f "cloudflared tunnel --url http://localhost:888" 2>/dev/null || true
sleep 2

# Step 1: Start a quick tunnel for the API port to get the URL
info "Starting API tunnel to capture URL..."
cloudflared tunnel --url http://localhost:8890 > /tmp/oc-api-tunnel.log 2>&1 &
API_TUNNEL_PID=$!

# Wait for the URL to appear (up to 20s)
API_URL=""
for i in $(seq 1 20); do
    sleep 1
    API_URL=$(grep -oP 'https://[a-z0-9-]+\.trycloudflare\.com' /tmp/oc-api-tunnel.log | head -1)
    [[ -n "$API_URL" ]] && break
done

if [[ -z "$API_URL" ]]; then
    echo "ERROR: Could not get API tunnel URL. Check /tmp/oc-api-tunnel.log"
    exit 1
fi
success "API URL: $API_URL"

# Step 2: Update docker-compose.yml with new API URL
info "Updating docker-compose.yml with new API URL..."
OLD_URL=$(grep -oP 'https://[a-z0-9-]+\.trycloudflare\.com' docker-compose.yml | head -1)
if [[ -n "$OLD_URL" && "$OLD_URL" != "$API_URL" ]]; then
    sed -i "s|$OLD_URL|$API_URL|g" docker-compose.yml
    success "Updated URL from $OLD_URL to $API_URL"
    REBUILD=true
else
    warn "URL unchanged or already set, skipping update"
    REBUILD=false
fi

# Step 3: Stop existing containers
info "Stopping existing containers..."
docker compose down --remove-orphans 2>&1 | grep -v "^$" || true

# Step 4: Build if URL changed (frontends need URL baked in at build time)
if [[ "$REBUILD" == "true" ]]; then
    info "Rebuilding frontend images with new API URL..."
    docker compose build --no-cache admin
    docker compose build --no-cache onechemic
    success "Frontend images rebuilt"
fi

# Step 5: Start all containers
info "Starting all containers..."
docker compose up -d
sleep 8
docker compose ps

# Step 6: Start admin and frontend tunnels
info "Starting admin and frontend tunnels..."
cloudflared tunnel --url http://localhost:8888 > /tmp/oc-admin-tunnel.log 2>&1 &
cloudflared tunnel --url http://localhost:8889 > /tmp/oc-frontend-tunnel.log 2>&1 &

# Wait for tunnel URLs
ADMIN_URL=""
FRONTEND_URL=""
for i in $(seq 1 20); do
    sleep 1
    [[ -z "$ADMIN_URL" ]]    && ADMIN_URL=$(grep -oP 'https://[a-z0-9-]+\.trycloudflare\.com' /tmp/oc-admin-tunnel.log | head -1)
    [[ -z "$FRONTEND_URL" ]] && FRONTEND_URL=$(grep -oP 'https://[a-z0-9-]+\.trycloudflare\.com' /tmp/oc-frontend-tunnel.log | head -1)
    [[ -n "$ADMIN_URL" && -n "$FRONTEND_URL" ]] && break
done

# Save URLs to file
cat > LIVE_URLS.txt << URLEOF
OneChemic Live URLs (Last Updated: $(date '+%Y-%m-%d %H:%M'))
================================================

Admin Dashboard:  ${ADMIN_URL:-NOT AVAILABLE}
Frontend Website: ${FRONTEND_URL:-NOT AVAILABLE}
API Backend:      $API_URL

Admin Login:
  Username: admin
  Password: 6:qQ/]UKo924
  Email:    admin@onechemic.com

Note: Cloudflare quick tunnel URLs change every restart.
Run ./redeploy.sh to get new URLs after each restart.
URLEOF

echo ""
echo "========================================"
success "OneChemic is LIVE!"
echo "========================================"
echo ""
echo -e "  ${GREEN}Admin Dashboard:${NC}  ${ADMIN_URL:-NOT AVAILABLE}"
echo -e "  ${GREEN}Frontend Website:${NC} ${FRONTEND_URL:-NOT AVAILABLE}"
echo -e "  ${GREEN}API Backend:${NC}      $API_URL"
echo ""
echo -e "  ${YELLOW}Admin Login:${NC}"
echo -e "    Username: admin"
echo -e "    Password: 6:qQ/]UKo924"
echo ""
echo "URLs saved to LIVE_URLS.txt"
echo ""
