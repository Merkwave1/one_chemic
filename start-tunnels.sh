#!/bin/bash

# OneChemic Cloudflare Tunnels Startup Script
# This script starts all 3 Cloudflare tunnels for the OneChemic project

# Kill any existing cloudflared processes
pkill -f "cloudflared tunnel" 2>/dev/null || true
sleep 2

echo "Starting Cloudflare tunnels..."

# Start API tunnel (port 8890)
cloudflared tunnel --url http://localhost:8890 > /tmp/tunnel-api.log 2>&1 &
API_PID=$!
echo "API tunnel started (PID: $API_PID)"

# Wait for API tunnel URL
sleep 5
API_URL=$(grep -oP 'https://[a-z0-9-]+\.trycloudflare\.com' /tmp/tunnel-api.log | head -1)
echo "API URL: $API_URL"

# Start Admin tunnel (port 8888)
cloudflared tunnel --url http://localhost:8888 > /tmp/tunnel-admin.log 2>&1 &
ADMIN_PID=$!
echo "Admin tunnel started (PID: $ADMIN_PID)"

# Wait for Admin tunnel URL
sleep 5
ADMIN_URL=$(grep -oP 'https://[a-z0-9-]+\.trycloudflare\.com' /tmp/tunnel-admin.log | head -1)
echo "Admin URL: $ADMIN_URL"

# Start Frontend tunnel (port 8889)
cloudflared tunnel --url http://localhost:8889 > /tmp/tunnel-frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend tunnel started (PID: $FRONTEND_PID)"

# Wait for Frontend tunnel URL
sleep 5
FRONTEND_URL=$(grep -oP 'https://[a-z0-9-]+\.trycloudflare\.com' /tmp/tunnel-frontend.log | head -1)
echo "Frontend URL: $FRONTEND_URL"

echo ""
echo "============================================"
echo "🚀 All tunnels are running!"
echo "============================================"
echo ""
echo "📋 Live HTTPS URLs:"
echo "  🔧 Admin:    $ADMIN_URL"
echo "  🌐 Website:  $FRONTEND_URL"
echo "  ⚙️  API:      $API_URL"
echo ""
echo "🔐 Admin Login: admin / admin123"
echo ""
echo "⚠️  Note: These temporary tunnels may expire after some time."
echo "   For permanent tunnels, set up a Cloudflare account with named tunnels."
echo ""
echo "To stop tunnels: pkill -f 'cloudflared tunnel'"
echo ""

# Save URLs to file
cat > /home/nassar/projects/one_chemic/LIVE_URLS.txt << EOF
OneChemic Live HTTPS URLs (Generated: $(date))
================================================

Admin Dashboard: $ADMIN_URL
  Login: admin / admin123

Public Website: $FRONTEND_URL

API Backend: $API_URL

Note: These temporary tunnels may expire. Run ./start-tunnels.sh to restart them.
EOF

echo "URLs saved to LIVE_URLS.txt"
