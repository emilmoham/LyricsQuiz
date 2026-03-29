# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
ARG REACT_APP_LYRICS_QUIZ_API_HOST
ENV REACT_APP_LYRICS_QUIZ_API_HOST=$REACT_APP_LYRICS_QUIZ_API_HOST
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
