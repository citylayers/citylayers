#!/bin/bash

# deploy_vm.sh - Deploy Neo4j container to a Compute Engine VM
source .env
# --- Steg 1: Bygg och Pusha imagen till Artifact Registry ---
echo "Starting Cloud Build to build and push Neo4j image..."
gcloud builds submit --config=imagebuild.yaml \
  --substitutions=_GCP_PROJECT_ID="${GCP_PROJECT_ID}",_GCP_REGION="${GCP_REGION}",_REPO_NAME="${REPO_NAME}",_IMAGE_NAME="${IMAGE_NAME}",_NEO4J_VERSION="${NEO4J_VERSION}" \
  . 

IMAGE_PATH="${GCP_REGION}-docker.pkg.dev/${GCP_PROJECT_ID}/${REPO_NAME}/${IMAGE_NAME}:${NEO4J_VERSION}"
echo "Image Path: $IMAGE_PATH"

# --- Steg 2: Skapa VM och Brandväggsregler ---


# 1. Skapa en brandväggsregel för HTTP (7474) och Bolt (7687)
# ... (brandväggskommando)

# 2. Skapa en VM med containern och nödvändiga Scope
echo "Creating Compute Engine VM and deploying container..."
gcloud compute instances create-with-container "${VM_NAME}" \
    --zone="${VM_ZONE}" \
    --machine-type="${VM_MACHINE_TYPE}" \
    --tags=http-server,https-server,neo4j-server \
    --service-account="${SERVICE_ACCOUNT}" \
    --scopes=https://www.googleapis.com/auth/cloud-platform \
    --container-image="${IMAGE_PATH}" \
    --container-env="NEO4J_AUTH=neo4j/${NEO4J_PWD},NEO4J_dbms_connector_http_listen__address=0.0.0.0:7474,NEO4J_dbms_connector_bolt_listen__address=0.0.0.0:7687" \
    --container-restart-policy=always \
# -   --container-arg="neo4j" 

# --- Steg 3: Visa anslutningsinformation ---
echo "Deployment complete."
echo "Waiting for VM to start and container to run..."
sleep 20 # Ökad väntetid för att säkerställa att containern hinner starta
EXTERNAL_IP=$(gcloud compute instances describe "${VM_NAME}" --zone="${VM_ZONE}" --format='get(networkInterfaces[0].accessConfigs[0].natIP)')

echo "--- ANVÄND DESSA ADRESSER FÖR ANSLUTNING ---"
echo "VM Namn: ${VM_NAME} i zon ${VM_ZONE}"
echo "Extern IP-adress: ${EXTERNAL_IP}"
echo "Neo4j Web Interface (Browser): http://${EXTERNAL_IP}:7474"
echo "Neo4j Bolt Protocol (Klienter): bolt://${EXTERNAL_IP}:7687"
echo "--- UPPLYSNINGAR ---"
echo "Standardanvändarnamn: neo4j"
echo "Initialt Lösenord (första inloggning): ${NEO4J_PWD} (hämtas från .env)"