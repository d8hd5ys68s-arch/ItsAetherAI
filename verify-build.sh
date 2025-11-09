#!/bin/bash

# Verify Build Output Script
# This script verifies that the build output is correct for GitHub Pages deployment

set -e

echo "🔍 Verifying build output for GitHub Pages deployment..."

# Check if dist folder exists
if [ ! -d "dist" ]; then
  echo "❌ Error: dist/ folder not found. Run 'npm run build' first."
  exit 1
fi

# Check if index.html exists
if [ ! -f "dist/index.html" ]; then
  echo "❌ Error: dist/index.html not found."
  exit 1
fi

# Check if assets folder exists
if [ ! -d "dist/assets" ]; then
  echo "❌ Error: dist/assets/ folder not found."
  exit 1
fi

# Check if index.html references .tsx files (should NOT)
if grep -q "\.tsx" dist/index.html; then
  echo "❌ Error: dist/index.html references .tsx files (should be .js after build)"
  echo "Found references:"
  grep "\.tsx" dist/index.html
  exit 1
fi

# Check if index.html references /src/ paths (should NOT)
if grep -q '"/src/' dist/index.html; then
  echo "❌ Error: dist/index.html references /src/ paths (should reference ./assets/)"
  echo "Found references:"
  grep '"/src/' dist/index.html
  exit 1
fi

# Check if index.html references ./assets/ paths (should)
if ! grep -q "./assets/" dist/index.html; then
  echo "❌ Error: dist/index.html does not reference ./assets/ paths"
  exit 1
fi

# Check if there are .js files in assets
JS_COUNT=$(find dist/assets -name "*.js" | wc -l)
if [ "$JS_COUNT" -eq 0 ]; then
  echo "❌ Error: No .js files found in dist/assets/"
  exit 1
fi

# Check if there are .css files in assets
CSS_COUNT=$(find dist/assets -name "*.css" | wc -l)
if [ "$CSS_COUNT" -eq 0 ]; then
  echo "❌ Error: No .css files found in dist/assets/"
  exit 1
fi

echo ""
echo "✅ Build verification passed!"
echo ""
echo "📊 Build output summary:"
echo "   - index.html: ✅ Found"
echo "   - JavaScript files: ✅ $JS_COUNT file(s)"
echo "   - CSS files: ✅ $CSS_COUNT file(s)"
echo "   - No .tsx references: ✅ Clean"
echo "   - Asset paths: ✅ Using ./assets/"
echo ""
echo "🚀 Build is ready for GitHub Pages deployment!"
