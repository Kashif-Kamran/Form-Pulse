#!/bin/bash

# Create uploads directory structure
# This script ensures all required upload directories exist

echo "🚀 Setting up upload directories..."

# Define base directory
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
UPLOADS_DIR="$BASE_DIR/uploads"

# Create main uploads directory
mkdir -p "$UPLOADS_DIR"
echo "✅ Created uploads directory: $UPLOADS_DIR"

# Create resources subdirectory
mkdir -p "$UPLOADS_DIR/resources"
echo "✅ Created resources directory: $UPLOADS_DIR/resources"

# Set appropriate permissions (optional - adjust based on deployment needs)
chmod 755 "$UPLOADS_DIR"
chmod 755 "$UPLOADS_DIR/resources"

echo "🎉 Upload directories setup completed successfully!"
echo ""
echo "Directory structure:"
echo "$UPLOADS_DIR/"
echo "├── README.md"
echo "├── .gitignore"
echo "└── resources/"
echo "    ├── .gitkeep"
echo "    └── .gitignore"
echo ""
