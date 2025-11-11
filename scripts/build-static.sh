#!/bin/bash
#
# Build script for static GitHub Pages export
# Temporarily moves API routes since they're not supported in static export
#

set -e

echo "🚀 Starting static build..."

# Move API routes out of the app directory
if [ -d "app/api" ]; then
  echo "📦 Temporarily moving API routes..."
  mv app/api /tmp/api-backup-$$
fi

# Move avatar upload page (requires Vercel Blob, not compatible with static export)
if [ -d "app/avatar" ]; then
  echo "📦 Temporarily moving avatar upload page..."
  mv app/avatar /tmp/avatar-backup-$$
fi

# Build static site
echo "🔨 Building static site..."
BUILD_MODE=static next build

# Restore API routes
if [ -d "/tmp/api-backup-$$" ]; then
  echo "📦 Restoring API routes..."
  mv /tmp/api-backup-$$ app/api
fi

# Restore avatar upload page
if [ -d "/tmp/avatar-backup-$$" ]; then
  echo "📦 Restoring avatar upload page..."
  mv /tmp/avatar-backup-$$ app/avatar
fi

echo "✅ Static build complete! Output in /out directory"
