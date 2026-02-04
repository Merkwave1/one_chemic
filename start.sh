#!/bin/bash

# OneChemic Docker Startup Script
# This script builds and starts all containers

set -e

echo "======================================"
echo "   OneChemic Docker Deployment"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Function to print colored output
print_status() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

print_info() {
    echo -e "${BLUE}[i]${NC} $1"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker and try again."
    exit 1
fi

print_status "Docker is running"

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    print_error "docker-compose is not installed. Please install it and try again."
    exit 1
fi

print_status "docker-compose is available"

# Determine which docker-compose command to use
if docker compose version &> /dev/null; then
    COMPOSE_CMD="docker compose"
else
    COMPOSE_CMD="docker-compose"
fi

# Parse command line arguments
BUILD_FLAG=""
DETACH_FLAG="-d"

while [[ $# -gt 0 ]]; do
    case $1 in
        --build|-b)
            BUILD_FLAG="--build"
            shift
            ;;
        --foreground|-f)
            DETACH_FLAG=""
            shift
            ;;
        --down|-d)
            print_info "Stopping and removing containers..."
            $COMPOSE_CMD down -v
            print_status "All containers stopped and removed"
            exit 0
            ;;
        --logs|-l)
            $COMPOSE_CMD logs -f
            exit 0
            ;;
        --help|-h)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --build, -b       Force rebuild of all images"
            echo "  --foreground, -f  Run in foreground (show logs)"
            echo "  --down, -d        Stop and remove all containers"
            echo "  --logs, -l        Show logs from all containers"
            echo "  --help, -h        Show this help message"
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

echo ""
print_info "Starting OneChemic services..."
echo ""

# Build and start containers
$COMPOSE_CMD up $BUILD_FLAG $DETACH_FLAG

if [ -n "$DETACH_FLAG" ]; then
    echo ""
    echo "======================================"
    print_status "All services are starting!"
    echo "======================================"
    echo ""
    echo "Services will be available at:"
    echo ""
    echo -e "  ${BLUE}PostgreSQL Database:${NC}  localhost:5432"
    echo -e "  ${BLUE}Backend API:${NC}          http://localhost:5224"
    echo -e "  ${BLUE}Admin Dashboard:${NC}      http://localhost:3000"
    echo -e "  ${BLUE}OneChemic Website:${NC}    http://localhost:3001"
    echo ""
    print_info "Use '$0 --logs' to view container logs"
    print_info "Use '$0 --down' to stop all containers"
    echo ""
    
    # Wait for services to be healthy
    print_info "Waiting for services to be ready..."
    sleep 5
    
    # Check if services are running
    if $COMPOSE_CMD ps | grep -q "onechemic-backend"; then
        print_status "Backend is running"
    else
        print_warning "Backend may still be starting..."
    fi
    
    if $COMPOSE_CMD ps | grep -q "onechemic-admin"; then
        print_status "Admin frontend is running"
    else
        print_warning "Admin frontend may still be starting..."
    fi
    
    if $COMPOSE_CMD ps | grep -q "onechemic-frontend"; then
        print_status "OneChemic frontend is running"
    else
        print_warning "OneChemic frontend may still be starting..."
    fi
    
    echo ""
    print_status "Deployment complete!"
fi
