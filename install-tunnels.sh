#!/bin/bash

# OneChemic Tunnel Service Installer
# This script installs systemd services for auto-restart of Cloudflare tunnels

echo "Installing OneChemic Cloudflare Tunnel services..."

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then
    echo "Please run with sudo: sudo ./install-tunnels.sh"
    exit 1
fi

# Copy service files to systemd
cp /home/nassar/projects/one_chemic/onechemic-tunnel-api.service /etc/systemd/system/
cp /home/nassar/projects/one_chemic/onechemic-tunnel-admin.service /etc/systemd/system/
cp /home/nassar/projects/one_chemic/onechemic-tunnel-frontend.service /etc/systemd/system/

# Reload systemd
systemctl daemon-reload

# Enable services (auto-start on boot)
systemctl enable onechemic-tunnel-api.service
systemctl enable onechemic-tunnel-admin.service
systemctl enable onechemic-tunnel-frontend.service

# Start services
systemctl start onechemic-tunnel-api.service
systemctl start onechemic-tunnel-admin.service
systemctl start onechemic-tunnel-frontend.service

echo ""
echo "✅ Services installed and started!"
echo ""
echo "Check status with:"
echo "  sudo systemctl status onechemic-tunnel-api"
echo "  sudo systemctl status onechemic-tunnel-admin"
echo "  sudo systemctl status onechemic-tunnel-frontend"
echo ""
echo "View URLs with:"
echo "  journalctl -u onechemic-tunnel-api -f"
echo "  journalctl -u onechemic-tunnel-admin -f"
echo "  journalctl -u onechemic-tunnel-frontend -f"
