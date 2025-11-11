#!/bin/bash
#
# Clean build artifacts that may have permission issues
# Run this with: sudo bash clean-build.sh
#

set -e

echo "🧹 Cleaning build artifacts..."

# Remove .next directory if it exists
if [ -d ".next" ]; then
  echo "Removing .next directory..."
  rm -rf .next
fi

# Remove out directory if it exists
if [ -d "out" ]; then
  echo "Removing out directory..."
  rm -rf out
fi

# Change ownership back to current user if needed
if [ -n "$SUDO_USER" ]; then
  echo "Changing ownership to $SUDO_USER..."
  chown -R $SUDO_USER:$SUDO_USER .
fi

echo "✅ Clean complete!"
echo ""
echo "Now you can run:"
echo "  npm run build:static"
echo "  npm run deploy:github"
