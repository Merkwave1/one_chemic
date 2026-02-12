#!/bin/bash

# OneChemic Tunnel Supervisor
# This script monitors and auto-restarts Cloudflare tunnels
# Run this in the background: nohup ./tunnel-supervisor.sh > /tmp/tunnel-supervisor.log 2>&1 &

LOGDIR="/tmp/onechemic-tunnels"
mkdir -p $LOGDIR

# Function to start a tunnel and monitor it
start_tunnel() {
    local PORT=$1
    local NAME=$2
    local LOGFILE="$LOGDIR/${NAME}.log"
    
    while true; do
        echo "[$(date)] Starting $NAME tunnel on port $PORT..." >> "$LOGFILE"
        
        # Start cloudflared and capture output
        cloudflared tunnel --url http://localhost:$PORT >> "$LOGFILE" 2>&1
        
        echo "[$(date)] $NAME tunnel stopped, restarting in 5 seconds..." >> "$LOGFILE"
        sleep 5
    done
}

echo "Starting OneChemic Tunnel Supervisor..."
echo "Log directory: $LOGDIR"

# Kill any existing cloudflared processes
pkill -f "cloudflared tunnel" 2>/dev/null

# Start all tunnels in background
start_tunnel 8890 "api" &
API_PID=$!
echo "API tunnel supervisor started (PID: $API_PID)"

start_tunnel 8888 "admin" &
ADMIN_PID=$!
echo "Admin tunnel supervisor started (PID: $ADMIN_PID)"

start_tunnel 8889 "frontend" &
FRONTEND_PID=$!
echo "Frontend tunnel supervisor started (PID: $FRONTEND_PID)"

echo ""
echo "All tunnel supervisors running!"
echo "Supervisors: API=$API_PID Admin=$ADMIN_PID Frontend=$FRONTEND_PID"
echo ""
echo "View logs:"
echo "  tail -f $LOGDIR/api.log"
echo "  tail -f $LOGDIR/admin.log"
echo "  tail -f $LOGDIR/frontend.log"
echo ""
echo "To stop all tunnels: pkill -f 'cloudflared tunnel'"

# Wait a moment for tunnels to start
sleep 8

# Extract and display URLs
echo ""
echo "============================================"
echo "🚀 LIVE HTTPS URLs"
echo "============================================"

API_URL=$(grep -oP 'https://[a-z0-9-]+\.trycloudflare\.com' $LOGDIR/api.log | head -1)
ADMIN_URL=$(grep -oP 'https://[a-z0-9-]+\.trycloudflare\.com' $LOGDIR/admin.log | head -1)
FRONTEND_URL=$(grep -oP 'https://[a-z0-9-]+\.trycloudflare\.com' $LOGDIR/frontend.log | head -1)

echo "⚙️  API:      $API_URL"
echo "🔧 Admin:    $ADMIN_URL"
echo "🌐 Website:  $FRONTEND_URL"
echo ""
echo "🔐 Admin Login: admin / admin123"
echo ""
echo "⚠️  IMPORTANT: The API URL has changed!"
echo "   You need to rebuild the frontends with the new API URL:"
echo ""
echo "   1. Update docker-compose.yml with new API URL"
echo "   2. Run: docker compose build --no-cache admin onechemic"
echo "   3. Run: docker compose up -d admin onechemic"
echo ""

# Save URLs to file
cat > /home/nassar/projects/one_chemic/LIVE_URLS.txt << EOF
OneChemic Live HTTPS URLs (Generated: $(date))
================================================

API Backend: $API_URL
Admin Dashboard: $ADMIN_URL
Public Website: $FRONTEND_URL

Admin Login: admin / admin123

IMPORTANT: If URLs change, you must rebuild the frontends!
Run: ./update-api-url.sh
EOF

# Wait for all background processes (keep script running)
wait
