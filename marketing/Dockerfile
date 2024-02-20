FROM node:alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM base AS builder
WORKDIR /app
RUN npm run build

FROM node:alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
CMD ["npm", "start"]