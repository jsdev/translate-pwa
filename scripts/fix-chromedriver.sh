#!/bin/bash

# Fix ChromeDriver compatibility script
echo "🔧 Fixing ChromeDriver compatibility..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: Run this script from the project root directory"
  exit 1
fi

# Get Chrome version
echo "📊 Checking Chrome version..."
if command -v google-chrome &> /dev/null; then
  CHROME_VERSION=$(google-chrome --version | cut -d " " -f3 | cut -d "." -f1)
  echo "   Chrome version: $CHROME_VERSION"
elif command -v google-chrome-stable &> /dev/null; then
  CHROME_VERSION=$(google-chrome-stable --version | cut -d " " -f3 | cut -d "." -f1)
  echo "   Chrome Stable version: $CHROME_VERSION"
elif command -v chromium-browser &> /dev/null; then
  CHROME_VERSION=$(chromium-browser --version | cut -d " " -f2 | cut -d "." -f1)
  echo "   Chromium version: $CHROME_VERSION"
else
  echo "❌ Chrome/Chromium not found. Please install Chrome first."
  exit 1
fi

# Install compatible ChromeDriver
echo "🚀 Installing compatible ChromeDriver..."
npm install -g chromedriver@latest

# Verify installation
echo "✅ Verification:"
if command -v google-chrome &> /dev/null; then
  google-chrome --version
elif command -v google-chrome-stable &> /dev/null; then
  google-chrome-stable --version
else
  chromium-browser --version
fi

chromedriver --version

echo "🎉 ChromeDriver compatibility fix completed!"
echo "💡 You can now run: npm run accessibility:test"
