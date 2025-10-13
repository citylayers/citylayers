# Deployment


## Neo4j

* [Install](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-neo4j-on-ubuntu-20-04) neo4j
* Import the [dump file](https://drive.google.com/file/d/1lXmp3yo3vVhVCQm8onAll1hxIhcdCzw9/view?usp=sharing)\
_Contact [Lovro](mailto:lovro.koncar-gamulin@tuwien.ac.at) to get the access_
* [Setup the database](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-neo4j-on-ubuntu-20-04)

## Node

* Clone the [repo](https://github.com/citylayers/citylayers)
* Install npm packages 
```sh
npm i
```
* Create a `.env` file in the project root with the following variables:
```
# Neo4j Database Configuration
NEO4J_URI=neo4j://localhost:7687
NEO4J_USER=neo4j
NEO4J_PWD=your_password_here

# Node Server Configuration
PORT=3000
DOMAIN=localhost
NODE_ENV=production

# GCP Deployment Configuration (optional - only needed for GCP deployment)
GCP_PROJECT_ID=your-gcp-project-id
GCP_REGION=us-central1
GCP_SERVICE_NAME=citylayers-neo4j
REPO_NAME=citylayers
IMAGE_NAME=citylayers-neo4j
NEO4J_VERSION=5.15.0
```
* start the server
```sh
npm run start
```

## GCP Deployment

### Prerequisites
* Install [gcloud CLI](https://cloud.google.com/sdk/docs/install)
* Create a GCP project
* Configure `.env` file with GCP variables (see above)

### Deploy Neo4j to GCP
Run the deployment script:
```sh
./build.sh
```

The script will:
1. Load configuration from `.env` file
2. Enable required GCP APIs
3. Build and push the Neo4j Docker image
4. Present deployment options:
   - **Cloud Run**: Serverless, auto-scaling
   - **Compute Engine VM**: Persistent instance with attached disk
   - **GKE**: Kubernetes deployment (manual configuration required)
   - **Build only**: Just build the image without deploying

After deployment, update your `.env` file with the Neo4j connection details provided by the script.

