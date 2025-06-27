# 🚀 GitHub Pages Setup Guide

This guide walks you through setting up GitHub Pages deployment for the ICE/CBP Translation Tool to achieve government-grade accessibility and performance standards.

## 📋 Prerequisites

- GitHub repository with the translate-pwa code
- Admin access to the repository settings
- GitHub Actions enabled

## 🔧 Step-by-Step Setup

### 1. Enable GitHub Pages

1. **Navigate** to your repository on GitHub
2. **Click** on "Settings" tab
3. **Scroll down** to "Pages" section in the left sidebar
4. **Under "Source"**, select "GitHub Actions"
5. **Save** the configuration

The URL will be: `https://[username].github.io/translate-pwa/`

### 2. Update Repository Configuration

If your repository name is different from `translate-pwa`, update the base path:

**In `vite.config.ts`:**
```typescript
export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/your-repo-name/' : '/',
  // ...rest of config
});
```

**In `lighthouserc.production.cjs`:**
```javascript
module.exports = {
  ci: {
    collect: {
      url: [
        'https://yourusername.github.io/your-repo-name/',
        'https://yourusername.github.io/your-repo-name/intake',
        // ...update all URLs
      ],
    },
  },
};
```

### 3. Verify Deployment Workflow

The deployment happens automatically when you push to the `main` branch. Check that:

1. **`.github/workflows/deploy.yml`** exists and is configured
2. **Permissions** are set correctly in the workflow
3. **Build artifacts** are uploaded to GitHub Pages

### 4. Test the Setup

```bash
# Push a change to main branch
git add .
git commit -m "feat: enable GitHub Pages deployment"
git push origin main

# Monitor the deployment
# Go to Actions tab in GitHub to watch the build/deploy process
```

## 🔍 Troubleshooting

### Issue: "Failed to create deployment (status: 404)"

**Cause:** GitHub Pages is not enabled or configured incorrectly.

**Solution:**
1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Ensure you have admin access to the repository

### Issue: "Permission denied" during deployment

**Cause:** Insufficient permissions for GitHub Actions.

**Solution:**
1. Go to repository Settings → Actions → General
2. Under "Workflow permissions", select "Read and write permissions"
3. Check "Allow GitHub Actions to create and approve pull requests"

### Issue: Routes return 404 after deployment

**Cause:** SPA routing not configured for GitHub Pages.

**Solution:** The `404.html` file should already be configured in `/public/404.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ICE/CBP Translation Tool</title>
  <script>
    // Redirect to index.html with the path as a query parameter for SPA routing
    const path = window.location.pathname.replace('/translate-pwa', '');
    const search = window.location.search;
    window.location.replace('/translate-pwa/' + '?redirect=' + encodeURIComponent(path + search));
  </script>
</head>
<body>
  <div>Redirecting...</div>
</body>
</html>
```

### Issue: Lighthouse CI fails on deployed site

**Cause:** URLs in Lighthouse config don't match deployed URLs.

**Solution:** The deploy workflow automatically updates URLs, but verify:

```bash
# Check that lighthouserc.production.cjs has correct URLs
# Should be https://yourusername.github.io/translate-pwa/
```

## 📊 Quality Validation

After deployment, verify perfect scores:

### Automated Checks
- **Lighthouse CI** runs automatically on deployment
- **Accessibility testing** with axe-core
- **Performance monitoring** for all routes

### Manual Verification
1. **Visit deployed site:** `https://yourusername.github.io/translate-pwa/`
2. **Test all routes** for accessibility compliance
3. **Verify PWA installation** works on mobile
4. **Check offline functionality**

## 🛡️ Security Configuration

### Content Security Policy
The deployed app uses strict CSP headers for government compliance:

```javascript
// In vite.config.ts
'Content-Security-Policy': [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "connect-src 'self'",
  "font-src 'self'",
  "manifest-src 'self'"
].join('; ')
```

### HTTPS Enforcement
GitHub Pages automatically provides HTTPS. The app includes:
- Strict Transport Security headers
- Secure cookie settings
- Mixed content protection

## 📈 Monitoring & Maintenance

### Automated Quality Gates
- **100/100** Lighthouse scores required for deployment
- **Zero** accessibility violations enforced
- **Zero** security vulnerabilities blocked

### Regular Updates
```bash
# Update dependencies monthly
npm audit
npm update

# Re-run quality checks
npm run lighthouse:routes
npm run accessibility:test
```

## 🎯 Success Metrics

With this setup, you achieve:

- ✅ **Government-grade accessibility** (Section 508, WCAG 2.1 AA)
- ✅ **Perfect performance scores** (100/100 Lighthouse)
- ✅ **Zero security vulnerabilities**
- ✅ **Automated quality assurance**
- ✅ **Production-ready deployment**

## 🆘 Support

If you encounter issues:

1. **Check GitHub Actions logs** for detailed error messages
2. **Verify repository permissions** are set correctly
3. **Ensure GitHub Pages** is enabled in repository settings
4. **Review the troubleshooting section** above

---

*This setup ensures government-ready deployment with perfect accessibility and performance scores.*
