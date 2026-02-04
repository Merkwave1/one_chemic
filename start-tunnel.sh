#!/bin/bash

# OneChemic - HTTPS with Cloudflare Tunnel (Automated Setup)
# This script automates the Cloudflare Tunnel setup for HTTPS

set -e

echo "=========================================="
echo "  OneChemic - Cloudflare Tunnel Setup"
echo "=========================================="
echo ""

# Check if cloudflared is installed
if ! command -v cloudflared &> /dev/null; then
    echo "ERROR: cloudflared not installed"
    echo ""
    echo "Install it first:"
    echo "  curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-x86_64.tgz | tar xz"
    echo "  sudo mv cloudflared /usr/local/bin/"
    echo ""
    echo "Then run this script again."
    exit 1
fi

echo "✓ cloudflared is installed"
echo ""

# Get current directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
TUNNEL_CONFIG="$SCRIPT_DIR/tunnel-config.yml"

echo "Checking if already authenticated..."
if ! cloudflared tunnel list &>/dev/null; then
    echo "Authenticating with Cloudflare..."
    cloudflared login
fi

echo ""
echo "Creating tunnel 'onechemic'..."
TUNNEL_ID=$(cloudflared tunnel create onechemic 2>&1 | grep -oP '(?<=Tunnel ID: )\S+' || echo "")

if [ -z "$TUNNEL_ID" ]; then
    # Tunnel might already exist
    echo "Tunnel 'onechemic' already exists"
    TUNNEL_ID=$(cloudflared tunnel list | grep onechemic | awk '{print $1}')
fi

echo "✓ Tunnel ID: $TUNNEL_ID"
echo ""

echo "🌐 Local Access URLs:"
echo "   Admin:    http://localhost:8888"
echo "   Website:  http://localhost:8889"
echo "   API:      http://localhost:8890"
echo ""

echo "Starting Cloudflare Tunnel..."
echo "Press Ctrl+C to stop"
echo ""
echo "After tunnel starts, you'll see a public URL."
echo "Update your applications to use that URL for HTTPS access."
echo ""

cd "$SCRIPT_DIR"
cloudflared tunnel run --config tunnel-config.yml onechemic

