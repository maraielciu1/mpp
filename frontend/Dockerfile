# Step 1: Build with Vite
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine

# Copy built files from Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: replace default Nginx config (for SPA routing support)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
