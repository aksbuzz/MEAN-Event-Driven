We'll build a microservice architecture.
Will have an Event Driven Arch.

- Event Queue: will provide a queuing mechanism for the post and comment objects

- Post Service: creating, updating, and deleting posts.

- Comment Service: creating, updating, and deleting comments. Will have a parent _PostId_.

- Lookup Service: only service accessible by the front-end.

## NATS

- We will connect our backend code to work with the frontend code.
- We will generate messages using NATS so that the individual microservices can communicate with each other
