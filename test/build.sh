export SERVER_VERSION=$(cat __version__.py | cut -d '=' -f2 | xargs)
source .env
gcloud builds submit --region=${GCP_REGION} --substitutions=_SERVER_VERSION=${SERVER_VERSION},_SERVER_NAME=${SERVER_NAME},_IMAGE_NAME=${IMAGE_NAME},_GCP_REGION=${GCP_REGION},_REPO_NAME=${REPO_NAME} --config imagebuild.yaml
# sed -r 's/SERVER_VERSION/'"$SERVER_VERSION"'/' imagebuild.yaml > container_versioned.yaml
gcloud run deploy citylayers-server --image ${GCP_REGION}-docker.pkg.dev/${SERVER_NAME}/${REPO_NAME}/${IMAGE_NAME}:${SERVER_VERSION}