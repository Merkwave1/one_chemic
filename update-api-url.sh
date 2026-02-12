#!/bin/bash

# Update API URL and rebuild frontends
# Usage: ./update-api-url.sh <new-api-url>

if [ -z "$1" ]; then
    # Try to get URL from log
    API_URL=$(grep -oP 'https://[a-z0-9-]+\.trycloudflare\.com' /tmp/onechemic-tunnels/api.log 2>/dev/null | head -1)
    if [ -z "$API_URL" ]; then
        echo "Usage: ./update-api-url.sh <api-url>"
        echo "Example: ./update-api-url.sh https://example.trycloudflare.com"
        exit 1
    fi
else
    API_URL="$1"
fi

echo "Updating API URL to: $API_URL"

# Update docker-compose.yml
sed -i "s|NEXT_PUBLIC_API_URL=https://[a-z0-9-]*\.trycloudflare\.com|NEXT_PUBLIC_API_URL=$API_URL|g" /home/nassar/projects/one_chemic/docker-compose.yml

echo "Updated docker-compose.yml"

# Rebuild frontends
echo "Rebuilding admin and onechemic frontends..."
cd /home/nassar/projects/one_chemic
docker compose build --no-cache admin onechemic

echo "Restarting containers..."
docker compose up -d admin onechemic

echo ""
echo "✅ Done! Frontends rebuilt with new API URL: $API_URL"
