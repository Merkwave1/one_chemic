#!/bin/bash

# OneChemic - Cloudflare Tunnel & HTTPS Setup
# This script sets up free HTTPS with valid Let's Encrypt certificates

set -e

echo "=========================================="
echo "  OneChemic - HTTPS Setup with Tunnel"
echo "=========================================="
echo ""

# Check if cloudflared is installed
if ! command -v cloudflared &> /dev/null; then
    echo "ERROR: cloudflared not found. Please install it first:"
    echo "  https://developers.cloudflare.com/cloudflare-one/connections/connect-applications/install-and-setup/installation/"
    exit 1
fi

echo "Current Service URLs (HTTP):"
echo "  Admin:    http://localhost:8888"
echo "  Frontend: http://localhost:8889"
echo "  API:      http://localhost:8890"
echo ""
echo "Services are running and accessible!"
echo ""
echo "For HTTPS with valid certificates, you have these options:"
echo ""
echo "OPTION 1: Free Cloudflare Tunnel (Recommended)"
echo "==========================================="
echo "Provides:"
echo "  ✓ Free HTTPS with valid certificates (no self-signed warnings)"
echo "  ✓ Works from anywhere (your server doesn't need a domain)"
echo "  ✓ Automatic certificate renewal"
echo "  ✓ Safe tunnel - no ports exposed to internet"
echo ""
echo "To set up:"
echo "  1. Go to: https://dash.cloudflare.com/"
echo "  2. Login or create free account"
echo "  3. Run: cloudflared login"
echo "  4. Run: cloudflared tunnel create onechemic"
echo "  5. Run: cloudflared tunnel route dns onechemic admin.onechemic.local"
echo "  6. Run: cloudflared tunnel route dns onechemic api.onechemic.local"
echo "  7. Run: cloudflared tunnel route dns onechemic onechemic.onechemic.local"
echo "  8. Run: cloudflared tunnel run --config ./tunnel-config.yml onechemic"
echo ""
echo "Then access at:"
echo "  Admin:    https://admin.onechemic.local"
echo "  Frontend: https://onechemic.onechemic.local"
echo "  API:      https://api.onechemic.local"
echo ""
echo "---"
echo ""
echo "OPTION 2: Use Local IPs with HTTP"
echo "=================================="
echo "Access via:"
echo "  Admin:    http://$(hostname -I | awk '{print $1}'):8888"
echo "  Frontend: http://$(hostname -I | awk '{print $1}'):8889"
echo "  API:      http://$(hostname -I | awk '{print $1}'):8890"
echo ""
echo "---"
echo ""
echo "OPTION 3: Use ngrok (Alternative)"
echo "=================================="
echo "  1. Install: https://ngrok.com/download"
echo "  2. Run: ngrok http 8888 8889 8890"
echo "  3. Get public URLs with HTTPS"
echo ""

