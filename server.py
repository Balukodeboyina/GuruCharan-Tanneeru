import http.server
import socketserver
import os
import sys

PORT = int(os.environ.get('PORT', 3000))
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class ResumeHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        if self.path.endswith('.pdf'):
            self.send_header('Content-Type', 'application/pdf')
            self.send_header('Content-Disposition', 'inline; filename="GuruCharan_Resume.pdf"')
        super().end_headers()

if __name__ == '__main__':
    with socketserver.TCPServer(("", PORT), ResumeHTTPRequestHandler) as httpd:
        print(f"=======================================================")
        print(f" GuruCharan Resume Website running at:")
        print(f" http://localhost:{PORT}")
        print(f" Direct PDF URL: http://localhost:{PORT}/assets/GuruCharan_Resume.pdf")
        print(f"=======================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
            httpd.shutdown()
