#!/usr/bin/env python3
import http.server
import socketserver
import json
import urllib.parse
from datetime import datetime
import os

class CinnamonbredHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/add-message':
            try:
                # Read the POST data
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                
                # Parse the JSON data
                data = json.loads(post_data.decode('utf-8'))
                name = data.get('name', 'Anonymous Admirer')
                message = data.get('message', '')
                
                # Create timestamp
                timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                
                # Create guest book entry
                entry = f"{timestamp} | {name} | {message}\n"
                
                # Append to guestbook.txt file
                with open('guestbook.txt', 'a', encoding='utf-8') as f:
                    f.write(entry)
                
                # Send success response
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                
                response = {
                    'status': 'success',
                    'message': 'Message added to guest book! 💕'
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
                
                print(f"💕 New guest book message from {name}: {message}")
                
            except Exception as e:
                print(f"Error handling POST request: {e}")
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                
                response = {
                    'status': 'error',
                    'message': 'Failed to add message'
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
        
        elif self.path == '/get-messages':
            try:
                messages = []
                
                # Read existing messages from guestbook.txt
                if os.path.exists('guestbook.txt'):
                    with open('guestbook.txt', 'r', encoding='utf-8') as f:
                        lines = f.readlines()
                        
                    # Parse each line and create message objects
                    for line in reversed(lines[-20:]):  # Get last 20 messages, reversed for newest first
                        line = line.strip()
                        if line:
                            parts = line.split(' | ', 2)
                            if len(parts) == 3:
                                timestamp, name, message = parts
                                messages.append({
                                    'timestamp': timestamp,
                                    'name': name,
                                    'message': message
                                })
                
                # Send response
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                
                response = {
                    'status': 'success',
                    'messages': messages
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
                
            except Exception as e:
                print(f"Error getting messages: {e}")
                self.send_response(500)
                self.end_headers()
        
        else:
            self.send_response(404)
            self.end_headers()

    def do_OPTIONS(self):
        # Handle CORS preflight requests
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

def run_server(port=8080):
    with socketserver.TCPServer(("", port), CinnamonbredHandler) as httpd:
        print(f"🎨 Cinnamonbred's magical server running at http://localhost:{port}")
        print(f"💕 Guest book messages will be saved to 'guestbook.txt'")
        print("✨ Press Ctrl+C to stop the server")
        
        # Create guestbook.txt if it doesn't exist
        if not os.path.exists('guestbook.txt'):
            with open('guestbook.txt', 'w', encoding='utf-8') as f:
                f.write(f"{datetime.now().strftime('%Y-%m-%d %H:%M:%S')} | Welcome | Welcome to Kate's magical art world! 🌟\n")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n💫 Magical server stopped. Guest book messages saved! 💕")

if __name__ == "__main__":
    run_server() 