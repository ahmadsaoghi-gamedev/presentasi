# 🚀 Deployment Guide

This guide will help you deploy the Interactive Presentation application to
various platforms.

## 📋 Prerequisites

- A GitHub account
- Basic knowledge of Git
- (Optional) Vercel account for advanced deployment

## 🌐 Deployment Options

### Option 1: GitHub Pages (Recommended for beginners)

1. **Create a GitHub Repository**

   ```bash
   # Initialize git repository
   git init

   # Add all files
   git add .

   # Commit changes
   git commit -m "Initial commit: Interactive presentation app"

   # Add remote repository (replace with your GitHub repo URL)
   git remote add origin https://github.com/yourusername/describing-people-presentation.git

   # Push to GitHub
   git push -u origin main
   ```

2. **Enable GitHub Pages**

   - Go to your repository on GitHub
   - Click on "Settings" tab
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

3. **Access Your Application**
   - Your app will be available at:
     `https://yourusername.github.io/describing-people-presentation`
   - It may take a few minutes to deploy

### Option 2: Vercel (Recommended for advanced users)

1. **Install Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **Deploy to Vercel**

   ```bash
   # Login to Vercel
   vercel login

   # Deploy the project
   vercel

   # Follow the prompts:
   # - Set up and deploy? Y
   # - Which scope? (select your account)
   # - Link to existing project? N
   # - Project name: describing-people-presentation
   # - Directory: ./
   ```

3. **Automatic Deployments**
   - Connect your GitHub repository to Vercel
   - Every push to main branch will automatically deploy
   - Get custom domain and SSL certificate

### Option 3: Netlify

1. **Drag and Drop Deployment**

   - Go to [netlify.com](https://netlify.com)
   - Drag your project folder to the deploy area
   - Get instant deployment URL

2. **Git Integration**
   - Connect your GitHub repository
   - Enable automatic deployments
   - Configure custom domain

### Option 4: Firebase Hosting

1. **Install Firebase CLI**

   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**

   ```bash
   firebase login
   firebase init hosting

   # Select your project
   # Public directory: ./
   # Single-page app: N
   # Overwrite index.html: N
   ```

3. **Deploy**
   ```bash
   firebase deploy
   ```

## 🔧 Configuration Files

The project includes these deployment-ready files:

- `vercel.json` - Vercel configuration
- `package.json` - Node.js dependencies and scripts
- `.gitignore` - Git ignore rules
- Static files only - no backend required

## 📱 Testing Your Deployment

After deployment, test these features:

1. **Navigation**: Use arrow keys and navigation buttons
2. **Quizzes**: Complete all quiz questions
3. **Responsive Design**: Test on different screen sizes
4. **Audio**: Check text-to-speech functionality
5. **Scoring**: Verify score calculation works

## 🐛 Troubleshooting

### Common Issues

1. **Images not loading**

   - Check image URLs are accessible
   - Ensure HTTPS for external images

2. **Audio not working**

   - Some browsers require user interaction before playing audio
   - Check browser console for errors

3. **Mobile layout issues**

   - Test on actual devices, not just browser dev tools
   - Check viewport meta tag

4. **GitHub Pages not updating**
   - Wait 5-10 minutes for deployment
   - Check repository settings
   - Clear browser cache

### Performance Optimization

1. **Image Optimization**

   - Compress images before uploading
   - Use WebP format when possible
   - Implement lazy loading

2. **Caching**

   - Configure proper cache headers
   - Use CDN for static assets

3. **Bundle Size**
   - Minify CSS and JavaScript
   - Remove unused code

## 🔒 Security Considerations

1. **Content Security Policy**

   - Add CSP headers for production
   - Restrict external resource loading

2. **HTTPS**

   - Always use HTTPS in production
   - Configure SSL certificates

3. **Input Validation**
   - Validate all user inputs
   - Sanitize data before processing

## 📊 Analytics Setup

### Google Analytics

```html
<!-- Add to index.html before closing </head> tag -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

### Simple Scoring

The app includes a simple scoring system that works entirely in the browser
without any data collection or storage.

## 🚀 Advanced Deployment

### Custom Domain

1. **Vercel**: Add domain in project settings
2. **GitHub Pages**: Configure custom domain in repository settings
3. **DNS**: Point your domain to the hosting provider

### Environment Variables

```bash
# For Vercel
vercel env add ANALYTICS_ID
vercel env add API_KEY

# For other platforms, check their documentation
```

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

## 📞 Support

If you encounter issues during deployment:

1. Check the platform's documentation
2. Review error logs in the deployment console
3. Test locally first with `npm run dev`
4. Open an issue in the GitHub repository

## 🎉 Success!

Once deployed, your interactive presentation will be accessible to students
worldwide. Share the URL with teachers and students to start learning!

---

**Happy Deploying! 🚀**
