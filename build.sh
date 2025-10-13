#!/bin/bash

# build.sh - Deploy Neo4j container to GCP
# Usage: ./build.sh

source .env

# Set the project
echo "Setting GCP project..."
gcloud config set project "${GCP_PROJECT_ID}"

# Enable required APIs
echo "Enabling required GCP APIs..."
gcloud services enable cloudbuild.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable compute.googleapis.com

# Build and push the image using Cloud Build

gcloud builds submit --config=imagebuild.yaml \
  --substitutions=_GCP_PROJECT_ID="${GCP_PROJECT_ID}",_GCP_REGION="${GCP_REGION}",_REPO_NAME="${REPO_NAME}",_IMAGE_NAME="${IMAGE_NAME}",_NEO4J_VERSION="${NEO4J_VERSION}" \
  . 


gcloud run deploy "${SERVICE_NAME}" \
    --image="${GCP_REGION}-docker.pkg.dev/${GCP_PROJECT_ID}/${REPO_NAME}/${IMAGE_NAME}:${NEO4J_VERSION}" \
    --region="${GCP_REGION}" \
    --platform=managed \
    --allow-unauthenticated \
    --memory=4Gi \
    --cpu=2 \
    --port=7474 \
    --set-env-vars="NEO4J_AUTH=neo4j/${NEO4J_PWD}" \
    --execution-environment=gen2
