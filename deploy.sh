
#!/bin/bash

# City Cool HVACR Deployment Script
echo "🚀 Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🏗️ Building the application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Build files are available in the 'dist' directory"
    echo ""
    echo "📋 Deployment Instructions:"
    echo "1. Copy all files from the 'dist' directory to your web server"
    echo "2. Configure your web server to serve the index.html file for all routes"
    echo "3. Ensure your on-premises Supabase instance is accessible at: http://161.97.175.226:8010"
    echo ""
    echo "🌐 For Apache, add this to your .htaccess file in the dist directory:"
    echo "RewriteEngine On"
    echo "RewriteCond %{REQUEST_FILENAME} !-f"
    echo "RewriteCond %{REQUEST_FILENAME} !-d"
    echo "RewriteRule . /index.html [L]"
    echo ""
    echo "🌐 For Nginx, add this to your server configuration:"
    echo "location / {"
    echo "  try_files \$uri \$uri/ /index.html;"
    echo "}"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
