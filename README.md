# 🏛️ DHS Translation Tool

Built a prototype to show how intake can be done better.

> **Government-ready Progressive Web App** for secure communication between law enforcement agents and individuals during apprehensions. Built to highest accessibility and security standards.

## ✨ Perfect Quality Scores

[![Performance](https://img.shields.io/badge/Lighthouse%20Performance-100-brightgreen)](./LIGHTHOUSE_CI.md)
[![Accessibility](https://img.shields.io/badge/Accessibility-100-brightgreen)](./LIGHTHOUSE_CI.md)
[![Best Practices](https://img.shields.io/badge/Best%20Practices-100-brightgreen)](./LIGHTHOUSE_CI.md)
[![SEO](https://img.shields.io/badge/SEO-100-brightgreen)](./LIGHTHOUSE_CI.md)
[![axe Compliance](https://img.shields.io/badge/axe%20Accessibility-✅-brightgreen)](#accessibility-testing)

**Zero accessibility violations • Zero security vulnerabilities • 100% automated quality assurance**

## 🎯 Mission Critical Features

- **Prevent Family Separations** - Clear communication about relationships
- **Identify Medical Issues** - Immediate health assessment capabilities  
- **Set Clear Expectations** - Consistent, transparent communication
- **Ensure Accountability** - Complete audit trail for all interactions

## 🏗️ Technical Excellence

### Government Compliance
- ✅ **Section 508** accessibility compliance
- ✅ **WCAG 2.1 AA** standards exceeded
- ✅ **NIST Cybersecurity Framework** alignment
- ✅ **OWASP Top 10** protection
- ✅ **Zero vulnerabilities** in dependencies

### Performance Optimizations
- ⚡ **Vite 7.0** with aggressive chunk splitting
- 📦 **Vendor/Router/Icons/Store** separated for optimal caching
- 🎯 **Modern ES2020** targeting for minimal bundle size
- 🗜️ **Terser optimization** with multiple compression passes
- 🚀 **Pre-bundled dependencies** for faster loading

### Accessibility Excellence
- 🎛️ **Radio inputs** for theme selection (native state management)
- ☑️ **Checkbox inputs** for toggles (proper form semantics)
- 🏷️ **Fieldset/legend** grouping for form sections
- 🔍 **ARIA labels** and descriptions throughout
- ⌨️ **Keyboard navigation** support for all interactions
- 📱 **Screen reader** optimization

## 🚀 Quick Start

### Development
```bash
git clone <repository-url>
cd translate-pwa
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### GitHub Pages Deployment
```bash
npm run build:github
npm run deploy
```

## 📊 Automated Quality Assurance

### Lighthouse CI
Our CI/CD pipeline automatically tests all routes for performance, accessibility, and best practices:

```bash
# Test all routes with detailed summary
npm run lighthouse:routes

# Full audit with production build
npm run lighthouse

# Quick single-route test
npm run lighthouse:test

# CI/CD validation (runs on every PR)
npm run lighthouse:ci
```

### Accessibility Testing
Automated accessibility testing ensures government compliance:

```bash
# Install axe CLI globally
npm install -g @axe-core/cli

# Test all routes for accessibility violations
npm run accessibility:test

# Generate detailed JSON accessibility reports
npm run accessibility:report

# Generate HTML accessibility reports with visual interface
npm run accessibility:html

# CI/CD accessibility testing
npm run accessibility:ci
```

#### Accessibility Reports
The HTML accessibility reports provide:
- **Master Summary**: `accessibility-reports/index.html` - Overview of all routes
- **Individual Reports**: `accessibility-reports/axe-report-{route}.html` - Detailed analysis per route
- **JSON Data**: `accessibility-reports/*.json` - Machine-readable results for CI/CD

All reports include:
- WCAG 2.1 AA compliance status
- Section 508 compliance status
- Detailed violation descriptions with remediation guidance
- Pass/fail metrics and trending

### Development Server
For testing SPA routing locally, the project includes a custom SPA server:

```bash
# Start SPA-compatible development server
cd dist && python3 ../scripts/spa-server.py 8080

# Features:
# - Client-side routing support
# - Fallback to index.html for routes
# - Static asset serving
# - CORS handling for testing
```

The SPA server script (`scripts/spa-server.py`) automatically handles client-side routing by serving `index.html` for any route that doesn't correspond to a static file, enabling proper testing of React Router routes.

### Route Coverage
All routes are automatically tested for perfect scores:
- `/` - Home (redirects to intake)
- `/intake` - Primary data collection
- `/phrases` - Categorized phrase library
- `/translation` - Real-time translation interface
- `/record` - Audio recording and playback
- `/conversations` - History and audit trail
- `/settings` - User preferences and configuration

## 🧭 Dynamic Route-Driven Testing

All automated quality checks (Lighthouse, axe accessibility) use a single source of truth for app routes:
- **`src/routes.ts`** exports all current app routes as an array.
- Test scripts and CI import this array, so tests always match the app's router.
- Add or remove routes in `src/routes.ts` and all tests update automatically.

**Example:**
```ts
// src/routes.ts
export const appRoutes = [
  '/',
  '/intake',
  '/phrases',
  '/record',
  '/translate',
  '/conversations',
  '/settings',
];
```

**No more manual updates!**

## 📚 Documentation & Architecture

### Core Documentation
- **[Lighthouse CI Setup](./LIGHTHOUSE_CI.md)** - Automated performance and accessibility testing
- **[GitHub Pages Deployment](./GITHUB_PAGES.md)** - Production deployment and SPA routing
- **[Interactive Walkthrough](./src/components/walkthrough/)** - In-app technical documentation

### Architecture Highlights
- **React 18 + TypeScript** for type safety and modern patterns
- **Vite 7.0** with optimized build configuration
- **Zustand** for lightweight state management
- **Tailwind CSS** for utility-first styling
- **Supabase** for optional backend integration
- **Local-first** architecture with offline capabilities

## 🛡️ Security & Privacy

- 🔒 **Local-first architecture** - Data stays on device
- 🚫 **Zero external dependencies** - No third-party trackers
- 🛡️ **Strict CSP** in production
- 📋 **Security headers** implementation
- 🔐 **HTTPS-only** in production

## 🎨 Design Philosophy

Every feature designed for field conditions:
- High-stress situations
- Diverse linguistic backgrounds  
- Varying technical proficiency
- Critical need for accurate documentation

### Native Web Standards
- Uses `details/summary` for accordions (native exclusivity)
- Radio buttons handle theme state automatically
- Checkboxes provide built-in toggle semantics
- Minimal JavaScript for maximum reliability

## 🌐 Browser Support

- ✅ **Chrome/Edge** 88+
- ✅ **Firefox** 78+
- ✅ **Safari** 14+
- ✅ **Mobile browsers** (iOS/Android)

## 📱 Progressive Web App

- 📲 **Installable** on mobile devices
- ⚡ **Offline capabilities** 
- 🎭 **Maskable icons** for home screen
- 📸 **App screenshots** for install prompts
- 🏠 **Native app experience**

## 🤝 Contributing

We welcome contributions that maintain our perfect quality standards:

### Getting Started
1. **Fork** the repository
2. **Clone** your fork locally
3. **Install** dependencies: `npm install`
4. **Create** a feature branch: `git checkout -b feature/your-feature`

### Development Workflow
1. **Make changes** with comprehensive tests
2. **Run quality checks**: `npm run lighthouse:routes && npm run accessibility:test`
3. **Ensure perfect scores** on all Lighthouse metrics
4. **Verify accessibility** with zero axe violations
5. **Submit** a pull request with detailed description

### Quality Standards
- ✅ **100/100** Lighthouse scores across all metrics
- ✅ **Zero** accessibility violations (axe-core)
- ✅ **Zero** TypeScript errors or warnings
- ✅ **Zero** ESLint violations
- ✅ **Complete** test coverage for new features

### Automated Checks
All pull requests automatically run:
- Lighthouse CI on all routes
- axe accessibility testing
- TypeScript compilation
- ESLint code quality checks
- Build verification for GitHub Pages

## 📄 License

Government domain - designed for public sector deployment.

---

*Built with accessibility-first design and government-grade security standards.*
