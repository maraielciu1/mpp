#!/bin/bash

# === CONFIGURATION ===

# Docker Hub
DOCKER_USER="maraielciu1"
IMAGE_NAME="mppcopy-backend"

# AWS ECS
ECS_CLUSTER="my-marketplace-backtest-Cluster-DkIWTij4LopS"
ECS_SERVICE="my-marketplace-backtest-backend-Service-z3Y12LjYxFYA"
AWS_REGION="eu-central-1"

# S3 + CloudFront
S3_BUCKET="my-marketplace-frontend"
FRONTEND_CF_DIST_ID="E2XZM02EMHEKLI"
BACKEND_CF_DIST_ID="E2168UWVFDVA0N" 

# === DEPLOY BACKEND ===
echo "🔨 [1/5] Building backend image..."
docker build -t $IMAGE_NAME ./backend || exit 1
echo "✅ Backend image built"

echo "📦 [2/5] Tagging and pushing backend image to Docker Hub..."
docker tag $IMAGE_NAME $DOCKER_USER/$IMAGE_NAME:latest
docker push $DOCKER_USER/$IMAGE_NAME:latest || exit 1
echo "✅ Pushed to Docker Hub: $DOCKER_USER/$IMAGE_NAME:latest"

echo "🚀 [3/5] Redeploying backend to ECS..."
aws ecs update-service \
  --cluster $ECS_CLUSTER \
  --service $ECS_SERVICE \
  --force-new-deployment \
  --region $AWS_REGION > /dev/null || exit 1
echo "✅ ECS redeployment triggered"

echo "⚡ Invalidating backend CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id $BACKEND_CF_DIST_ID \
  --paths "/*" \
  --region $AWS_REGION > /dev/null
echo "✅ Backend CloudFront invalidated"

# === DEPLOY FRONTEND ===
echo "🧱 [4/5] Building frontend..."
cd ./frontend || exit 1
npm install > /dev/null
npm run build || { echo "❌ Frontend build failed"; exit 1; }
echo "✅ Frontend built"

echo "📤 [5/5] Uploading frontend to S3..."
aws s3 sync ./dist s3://$S3_BUCKET --delete --region $AWS_REGION || exit 1
echo "✅ Uploaded frontend to S3: s3://$S3_BUCKET"

echo "⚡ Invalidating frontend CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id $FRONTEND_CF_DIST_ID \
  --paths "/*" \
  --region $AWS_REGION > /dev/null
echo "✅ Frontend CloudFront invalidated"

echo ""
echo "🚀✅ Deployment Complete! Backend + Frontend updated."
