# CityLayers Deployment Guide

This repository contains two separate deployment configurations:
1. **Neo4j Database** (in `neo4j/` folder) - Self-hosted Neo4j container
2. **CityLayers Application** (in root) - Node.js web application

## Application Deployment (Root)

### Prerequisites
- GCP account with Cloud Run enabled
- Neo4j database (either hosted on Neo4j Aura or deployed via `neo4j/` folder)
- `.env` file configured with required variables

### Quick Start

1. **Configure `.env` file** in root with:
   - Neo4j connection credentials (URI, user, password)
   - GCP deployment settings (project ID, region, service name)

2. **Deploy to GCP Cloud Run**:
   ```bash
   ./build.sh
   ```

3. Application will be available at the Cloud Run service URL

### Environment Variables Required

**Database Connection:**
- `NEO4J_URI` - Neo4j connection string (e.g., `neo4j+s://xxx.databases.neo4j.io`)
- `NEO4J_USER` - Neo4j username
- `NEO4J_PWD` - Neo4j password

**Server Configuration:**
- `PORT` - Application port (default: 3000)
- `DOMAIN` - Domain name (default: localhost)
- `NODE_ENV` - Environment (production/development)

**GCP Deployment:**
- `GCP_PROJECT_ID` - Your GCP project ID
- `GCP_REGION` - Deployment region (e.g., europe-north1, europe-west1)
- `APP_SERVICE_NAME` - Cloud Run service name
- `REPO_NAME` - Docker repository name

### What Gets Deployed

The `build.sh` script:
1. Builds a multi-stage Docker image (TypeScript compilation + production runtime)
2. Pushes image to GCP Artifact Registry
3. Deploys to Cloud Run with environment variables
4. Configures health checks and auto-scaling

All sensitive data is passed as environment variables at runtime - never hardcoded.

---

## Neo4j Deployment (neo4j/ folder)

If you need to deploy your own Neo4j instance instead of using Neo4j Aura:

```bash
cd neo4j/
./build.sh
```

See `neo4j/.env` for Neo4j-specific deployment configuration.
