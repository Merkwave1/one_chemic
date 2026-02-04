#!/bin/bash

echo "═══════════════════════════════════════════════════════════════"
echo "  OneChemic - System Verification"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Checking Docker Services...${NC}"
echo ""

docker compose ps

echo ""
echo -e "${BLUE}Testing Services...${NC}"
echo ""

# Test Admin
echo -n "Admin Dashboard (8888): "
if curl -s http://localhost:8888 > /dev/null; then
    echo -e "${GREEN}✓ Running${NC}"
else
    echo -e "${RED}✗ Not responding${NC}"
fi

# Test Frontend
echo -n "Public Website (8889): "
if curl -s http://localhost:8889 > /dev/null; then
    echo -e "${GREEN}✓ Running${NC}"
else
    echo -e "${RED}✗ Not responding${NC}"
fi

# Test API
echo -n "API Backend (8890): "
if curl -s http://localhost:5224/api/product > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Running${NC}"
else
    echo -e "${RED}✗ Not responding${NC}"
fi

# Test Login
echo -n "Admin Login: "
LOGIN=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"userName":"admin","password":"admin123"}' \
  http://localhost:5224/api/user/login 2>/dev/null)

if echo "$LOGIN" | grep -q "token"; then
    echo -e "${GREEN}✓ Working${NC}"
    echo "   Token: $(echo "$LOGIN" | grep -o '"token":"[^"]*"' | head -1)"
else
    echo -e "${RED}✗ Failed${NC}"
fi

# Test Products
echo -n "Products API: "
if curl -s http://localhost:5224/api/product 2>/dev/null | grep -q "id"; then
    echo -e "${GREEN}✓ Working${NC}"
else
    echo -e "${RED}✗ Not responding${NC}"
fi

echo ""
echo -e "${BLUE}Available URLs${NC}"
echo ""
echo "  Admin Dashboard:  http://localhost:8888"
echo "  Public Website:   http://localhost:8889"
echo "  API Backend:      http://localhost:5224 (or :8890 via Caddy)"
echo ""
echo "  Server IP:        46.224.186.76"
echo "  External Access:  http://46.224.186.76:8888 (or via tunnel)"
echo ""
echo "Credentials:"
echo "  Admin Login: admin / admin123"
echo ""
echo -e "${BLUE}For HTTPS Setup${NC}"
echo ""
echo "  Run: cd /home/nassar/projects/one_chemic && ./start-tunnel.sh"
echo "  Or read: HTTPS-SETUP-GUIDE.md"
echo ""
echo "═══════════════════════════════════════════════════════════════"
