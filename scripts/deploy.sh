#!/bin/bash
set -e

# Load environment variables from .env if it exists
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Configuration
PROJECT_ID=${GOOGLE_CLOUD_PROJECT}
REGION=${REGION:-us-central1}
SERVICE_NAME="restaurant-concierge"

if [ -z "$PROJECT_ID" ]; then
    echo "Error: GOOGLE_CLOUD_PROJECT is not set. Please set it in .env or as an environment variable."
    exit 1
fi

if [ -z "$DB_PASSWORD" ]; then
    echo "Error: DB_PASSWORD is not set. Please set it in .env or as an environment variable."
    exit 1
fi

echo "Deploying $SERVICE_NAME to Cloud Run in project $PROJECT_ID ($REGION)..."

echo "Building image using Cloud Build..."
IMAGE_URL="gcr.io/$PROJECT_ID/$SERVICE_NAME"

gcloud builds submit --tag "$IMAGE_URL" --project "$PROJECT_ID"

echo "Deploying to Cloud Run..."
gcloud run deploy "$SERVICE_NAME" \
    --image "$IMAGE_URL" \
    --project "$PROJECT_ID" \
    --region "$REGION" \
    --allow-unauthenticated \
    --set-env-vars "GOOGLE_CLOUD_PROJECT=$PROJECT_ID,REGION=$REGION,DB_PASSWORD=$DB_PASSWORD,TOOLBOX_URL=http://127.0.0.1:5000,VERTEXAI_PROJECT=$PROJECT_ID,VERTEXAI_LOCATION=us-central1,GOOGLE_CLOUD_LOCATION=us-central1,GOOGLE_GENAI_USE_VERTEXAI=True" \
    --quiet

echo "Deployment complete!"
gcloud run services describe "$SERVICE_NAME" --project "$PROJECT_ID" --region "$REGION" --format='value(status.url)'
