
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Starting production build...');

try {
  // Clean previous build
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
    console.log('🧹 Cleaned previous build');
  }

  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm ci', { stdio: 'inherit' });

  // Build the application
  console.log('🏗️ Building application...');
  execSync('npm run build', { stdio: 'inherit' });

  // Create deployment package
  console.log('📦 Creating deployment package...');
  
  // Copy additional files to dist
  const filesToCopy = [
    { src: 'deploy-instructions.md', dest: 'dist/README.md' },
    { src: 'docker', dest: 'dist/docker' }
  ];

  filesToCopy.forEach(({ src, dest }) => {
    if (fs.existsSync(src)) {
      if (fs.statSync(src).isDirectory()) {
        fs.cpSync(src, dest, { recursive: true });
      } else {
        fs.copyFileSync(src, dest);
      }
      console.log(`📄 Copied ${src} to ${dest}`);
    }
  });

  console.log('✅ Production build completed successfully!');
  console.log('📁 All files are ready in the "dist" directory');
  console.log('🚀 You can now deploy the contents of the "dist" directory');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
