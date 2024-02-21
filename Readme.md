# Blog App

This application is a learning project consisting of four services: auth, posts, comments, and marketing. It provides users with the ability to create an account, obtain a token, and use that token to manage posts and comments. Additionally, the marketing service sends an email to users upon creating their first post, triggered by an event from the posts service. The marketing service uses eventual consistency to update its database when receiving events from other services.

# Technologies Used

- Backend Server: Fastify
- Database: MongoDB
- Frontend Framework: AngularJS
- Message Broker: Nats
- Web Server and Load Balancer: Nginx
- Containerization: Docker
- API Documentation: Swagger

# Setup Instructions

- Clone the repo

  ```
  git clone https://github.com/aksbuzz/MEAN-Event-Driven.git
  ```

- Start Docker Engine

- Execute following command

  ```
  docker compose -f "docker-compose.yml" up -d --build
  ```

- Access api on
  ```
  http://localhost
  ```

# Todo

1. Expose swagger
2. Add frontend with angular.
3. Use orchestration tool. eg., kubernetes
