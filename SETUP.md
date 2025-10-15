# 🚀 Citylayers Setup & Deployment Guide

## 📋 Prerequisites

* **Node.js** (v18.17.0 or higher)
* **npm** (comes with Node.js)
* **Neo4j Database** (v5.15.0 or higher) - [Neo4j Aura](https://neo4j.com/cloud/aura/) or local instance

## 🔧 Installation

### 1. Clone and Install

```bash
# Clone repository
git clone https://github.com/citylayers/citylayers.git
cd citylayers

# Install dependencies
npm install

# Install client dependencies
cd client && npm install && cd ..
```

### 2. Environment Configuration

Create `.env` in root directory:

```env
# Neo4j Database
NEO4J_URI=neo4j+s://your-database.neo4j.io
NEO4J_USER=neo4j
NEO4J_PWD=your-password

# Server
PORT=3000
DOMAIN=localhost
NODE_ENV=development
```

## 🏗️ Building

```bash
# Build server
npm run build

# Build client
cd client && npm run build && cd ..
```

## 🚀 Running

### Development (with hot reload)

**You need TWO processes running in separate terminals:**

**Terminal 1 - Server:**
```bash
npm run dev
```
This starts the Express server with nodemon (auto-restarts on server changes).

**Terminal 2 - Client:**
```bash
cd client && npm run watch
```
This compiles TypeScript on file changes (auto-compiles client code).

### Production
```bash
npm start
```

Access at: **http://localhost:3000**

## 💡 Quick Development Tips

### Complete Development Workflow
```bash
# Terminal 1: Server with hot reload
npm run dev

# Terminal 2: Client TypeScript watch mode
cd client && npm run watch
```

### Building Everything
```bash
# Build both server and client
npm run build && cd client && npm run build && cd ..
```

### TypeScript Status
After recent fixes, client TypeScript compiles with **0 errors** ✅
```bash
cd client && npx tsc --noEmit  # Verify: 0 errors
```

## 📁 Project Structure

```
citylayers/
├── src/
│   ├── server/src/          # Server (TypeScript)
│   │   ├── app.ts          # Entry point
│   │   ├── config/         # Configuration
│   │   ├── controllers/    # MVC Controllers
│   │   ├── services/       # Business logic
│   │   └── repositories/   # Data access
│   └── logic/              # Shared logic (used by both server & client)
├── client/
│   ├── src/                # Client (TypeScript)
│   │   ├── ui/component/   # UI components
│   │   ├── ui/panel/       # Panel components
│   │   └── constants/      # Constants/enums
│   └── dst/                # Compiled client (output)
├── public/                 # Static assets served by Express
├── dist/                   # Compiled server (output)
└── package.json            # Server dependencies & scripts
```

## 🗄️ Database Setup

1. Create Neo4j database at [Neo4j Aura](https://neo4j.com/cloud/aura/)
2. Copy credentials to `.env`
3. Run `npm start` to test connection

## 🌐 Deployment

### Google Cloud Run

```bash
gcloud builds submit --tag gcr.io/${GCP_PROJECT_ID}/${IMAGE_NAME}
gcloud run deploy ${SERVICE_NAME} --image gcr.io/${GCP_PROJECT_ID}/${IMAGE_NAME}
```

### Heroku

```bash
echo "web: npm start" > Procfile
heroku create && git push heroku main
```

### PM2 (Self-hosted)

```bash
npm install -g pm2
npm run build
cd client && npm run build && cd ..
pm2 start ecosystem.config.js
```

## 🐛 Troubleshooting

**Build errors:** Ensure Node.js >= v18.17.0
**TypeScript errors:** Run `cd client && npx tsc --noEmit` to check
**Database issues:** Verify credentials in `.env`
**Port in use:** Change PORT in `.env`
**Client not updating:** Make sure `npm run watch` is running in Terminal 2

## 📖 Documentation

See [docs/](docs/) folder for detailed refactoring documentation:
- PHASE1_COMPLETE.md - Configuration Layer
- PHASE2_COMPLETE.md - MVC Architecture
- PHASE3_COMPLETE.md - Advanced Tooling
- PHASE4_COMPLETE.md - Client Components (Simple)
- PHASE5A_COMPLETE.md - Client Components (Panels)
- PHASE5B_COMPLETE.md - Client Components (Complex)
- **TYPESCRIPT_FIXES.md** - Complete log of all TypeScript error fixes (143 → 0)

## 📝 Recent Improvements

✅ **All TypeScript errors fixed** (143 → 0)
✅ **Client watch mode added** for seamless development
✅ **Import paths corrected** across all components
✅ **ES5 compatibility** maintained throughout
✅ **OOP refactoring** with BaseComponent pattern

## ❓ FAQ

### Does `npm run watch` start the client?

**No!** `npm run watch` only **compiles** TypeScript files. Here's what each command does:

**Server (Terminal 1):**
```bash
npm run dev
```
- Starts the Express server
- Serves the application at http://localhost:3000
- Auto-restarts when server files change

**Client (Terminal 2):**
```bash
cd client && npm run watch
```
- **Only compiles** TypeScript → JavaScript
- Does **NOT** start a dev server
- The compiled JS files are served by the Express server

### Why two processes?

The Express server serves:
1. **HTML pages** (from `public/html/`)
2. **Static files** (CSS, images from `public/`)
3. **Compiled client JS** (from `client/dst/`)

The client watch process keeps `client/dst/` up to date as you edit TypeScript.

### Can I use one command?

You could create a script to run both, but two terminals is clearer for debugging.
