
# City Cool HVACR - Deployment Instructions

## Prerequisites
- Node.js 18+ installed
- Your on-premises Supabase instance running at `http://161.97.175.226:8010`
- Web server (Apache, Nginx, or Docker)

## Option 1: Standard Build & Deploy

### 1. Build the Application
```bash
# Make the deploy script executable
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

### 2. Deploy to Web Server
- Copy all files from the `dist` directory to your web server's document root
- Configure your web server for single-page application routing

### Apache Configuration (.htaccess)
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

### Nginx Configuration
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

## Option 2: Docker Deployment

### 1. Build and Run with Docker
```bash
# Navigate to the docker directory
cd docker

# Build and start the container
docker-compose up -d --build
```

### 2. Access the Application
- The application will be available at `http://localhost:3000`
- To use a different port, modify the `docker-compose.yml` file

## Option 3: Manual Build

### 1. Install Dependencies
```bash
npm install
```

### 2. Build for Production
```bash
npm run build
```

### 3. Serve the Built Files
The built files will be in the `dist` directory. Serve them using any static file server.

## Environment Configuration

The application is configured to connect to your on-premises Supabase instance:
- **URL**: `http://161.97.175.226:8010`
- **Anon Key**: Already configured in the environment

## Admin Access

Once deployed, you can access the admin panel with:
- **Email**: `admin@citycoolhvacr.com`
- **Password**: `admin123`

## Security Considerations

1. **Change Default Admin Password**: After deployment, change the default admin password
2. **HTTPS**: Consider setting up SSL/TLS for production
3. **Firewall**: Ensure proper firewall rules for your Supabase instance
4. **Backup**: Regular database backups of your Supabase instance

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Ensure your Supabase instance allows connections from your domain
2. **404 Errors**: Make sure your web server is configured for SPA routing
3. **Connection Issues**: Verify the Supabase URL and that the service is running

### Logs:
- Check browser console for frontend errors
- Check Supabase logs for backend issues
- Check web server logs for deployment issues

## Support

For technical support with this deployment, contact the development team.
