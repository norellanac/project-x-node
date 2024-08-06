
# ProjectX Backend Node.js

This project is a backend application built with Node.js and Sequelize. It uses Docker to run a MariaDB database.

## Table of Contents

- [Project Setup](#project-setup)
- [Running the Application](#running-the-application)
- [Database Migrations](#database-migrations)
- [Listing Routes](#listing-routes)
- [Testing](#testing)

## Project Setup

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- 
## Configuration

   - Navigate to the root directory of the project.
   - Copy the `.env.example` file to a new file named `.env`.
   - Open the `.env` file and adjust the values to match your local environment setup or Docker container setup.

### Clone the Repository

```bash
git clone https://github.com/yourusername/projectx-be-node.git
cd projectx-be-node
```

### Install Dependencies

```bash
npm install
```

### Set Up Docker

Pull the MariaDB Docker image:

```bash
docker pull mariadb:11.4.2
```

Run a MariaDB container:

```bash
docker run --detach --name some-mariadb --env MARIADB_ROOT_PASSWORD=my-secret-pw -p 3306:3306 mariadb:11.4.2
```

Access the running container:

```bash
docker exec -it some-mariadb bash
```

## Running the Application

Start the application using Nodemon:

```bash
npm start
```

## Database Migrations

### Running Migrations

To run all pending migrations:

```bash
npm run db-migrate
```

### Undoing Migrations

To undo the last migration:

```bash
npm run db-migrate-reset
```

### Refreshing Migrations

To undo all migrations and then run them again:

```bash
npm run db-migrate-refresh
```

## Listing Routes

To list all routes defined in the application:

```bash
npm run routes:list
```

## Testing

To run tests (currently, no tests are specified):

```bash
npm test
```

## Project Structure

```
.
├── src/api/v1
│   ├── controllers
│   ├── models
│   ├── routes
├── scripts
├── server.ts
├── utils
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=my-secret-pw
DB_NAME=projectx_db
DB_PORT=3306
```

## License

This project is licensed under the MIT License.
