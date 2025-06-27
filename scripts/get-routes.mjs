// Node script to print all app routes as full URLs for local testing

// Import routes directly - these should match src/routes.ts
const appRoutes = [
  '/',
  '/intake',
  '/phrases',
  '/record',
  '/translate',
  '/conversations',
  '/settings',
];

const port = process.env.PORT || 8080;
const baseUrl = `http://localhost:${port}`;

for (const route of appRoutes) {
  console.log(`${baseUrl}${route}`);
}
