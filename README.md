# PCD Web Viewer

Easily view .pcd files in your browser

## Requirements
- Python 3 - Serves static files via HTTP
- git - Downloads [three.js](https://github.com/mrdoob/three.js)

## Usage
1. Create a copy of a .pcd file in `pcd/` directory
   ```sh
   cp <file> pcd/
   ```
2. Run the server
   ```sh
   make serve
   ```
   `Serving HTTP on 0.0.0.0 port 1337 (http://0.0.0.0:1337/) ...`
