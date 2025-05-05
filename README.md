<!-- Prerekwizyty:
Zainstalowany Docker Compose
Zainstalowany git

Instalacja:

git clone https://github.com/Agnieszka0544/swift-code-api.git

W głównym katalogu projektu:
docker-compose build
docker-compose up

localhost:8080/v1/swift-codes -->

# Swift Code API

A simple API service for retrieving SWIFT codes.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://docs.docker.com/compose/install/)

## Installation and running the project

- Clone the repository:

```bash
git clone https://github.com/Agnieszka0544/swift-code-api.git
```

In the root directory of the project:

- Build the Docker containers:

```bash
docker compose build
```

- Run the application with tests:

```bash
docker compose up
```

- Run the application without tests:

```bash
docker compose up app mongo
```

- Access the API at <http://localhost:8080/v1/swift-codes>.

- To run only the tests, use the following command:

```bash
docker compose up test
```
