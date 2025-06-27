#!/usr/bin/env python3
"""
Simple HTTP server with SPA routing support for testing
Falls back to index.html for any route that doesn't exist
"""

import http.server
import socketserver
import os
import sys
from urllib.parse import urlparse

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # Remove leading slash and handle empty path
        if path == '/':
            path = 'index.html'
        else:
            path = path.lstrip('/')
        
        # Check if file exists
        if os.path.isfile(path):
            # File exists, serve it normally
            return super().do_GET()
        else:
            # File doesn't exist, check if it's an API call or asset
            if (path.startswith('api/') or 
                path.endswith('.js') or 
                path.endswith('.css') or 
                path.endswith('.png') or 
                path.endswith('.jpg') or 
                path.endswith('.ico') or
                path.endswith('.svg') or
                path.endswith('.json')):
                # Return 404 for actual missing files
                return super().do_GET()
            else:
                # SPA route, serve index.html
                self.path = '/'
                return super().do_GET()

if __name__ == "__main__":
    PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    
    with socketserver.TCPServer(("", PORT), SPAHandler) as httpd:
        print(f"🌐 SPA Server running on http://localhost:{PORT}")
        print("📱 Supporting client-side routing")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped")
