#!/bin/bash

# Cloudflare Tunnel Setup for OneChemic
# This script sets up free HTTPS with valid certificates for 3 services

echo "=========================================="
echo "  OneChemic - Cloudflare Tunnel Setup"
echo "=========================================="
echo ""
echo "This will create a free HTTPS tunnel with valid certificates"
echo "No domain purchase needed - access via tunnel URL"
echo ""

# Check if cloudflared is installed
if ! command -v cloudflared &> /dev/null; then
    echo "Installing cloudflared..."
    # For Ubuntu/Debian
    if command -v apt-get &> /dev/null; then
        curl -L https://pkg.cloudflare.com/cloudflare-release.key | sudo apt-key add -
        echo 'deb http://pkg.cloudflare.com/cloudflare-release $(lsb_release -cs) main' | sudo tee /etc/apt/sources.list.d/cloudflare-main.list
        sudo apt-get update
        sudo apt-get install -y cloudflared
    else
        echo "Please install cloudflared from: https://developers.cloudflare.com/cloudflare-one/connections/connect-applications/install-and-setup/installation/"
        exit 1
    fi
fi

echo "Starting cloudflared tunnel..."
echo ""
echo "Next steps:"
echo "1. When prompted, authenticate with your Cloudflare account"
echo "2. Choose a tunnel name (e.g., 'onechemic')"
echo "3. Route your subdomains if you have a Cloudflare-managed domain"
echo "4. Or use the auto-generated tunnel URL for public access"
echo ""

# Run the tunnel command
cloudflared tunnel run

