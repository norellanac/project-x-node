
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

## Swagger API Documentation

Our project uses Swagger for API documentation. This allows us to provide interactive documentation for our API endpoints, where you can easily test and explore different API requests and responses.

### Viewing the Documentation

To view the Swagger API documentation:

1. Ensure the server is running by executing `npm start` in your terminal.
2. Open a web browser and navigate to `http://localhost:8000/api-docs`.

This will open the Swagger UI, where you can see all available API endpoints, their request parameters, and responses. You can also try out the API directly from this interface by sending requests to the server.

### Generating Swagger Documentation

The Swagger documentation is automatically generated from the source code. The configuration for Swagger is defined in [`swaggerConfig.ts`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fneryalexisorellana%2FDocuments%2FdevProjects%2Fjs%2Fnode%2Fprojectx-be-node%2FswaggerConfig.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/neryalexisorellana/Documents/devProjects/js/node/projectx-be-node/swaggerConfig.ts"). The key options include:

- **OpenAPI Version**: Specifies the OpenAPI Specification (OAS) version used (currently `3.0.0`).
- **Info**: Provides metadata about the API such as the title, version, and description.
- **APIs**: Points to the location of your route files where Swagger will look to generate documentation based on JSDoc comments.

To ensure your API changes are reflected in the Swagger documentation, simply update the JSDoc comments in your route files and restart the server.

### Customizing Swagger Documentation

You can customize the Swagger documentation by modifying the [`swaggerOptions`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fneryalexisorellana%2FDocuments%2FdevProjects%2Fjs%2Fnode%2Fprojectx-be-node%2FswaggerConfig.ts%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fneryalexisorellana%2FDocuments%2FdevProjects%2Fjs%2Fnode%2Fprojectx-be-node%2FswaggerConfig.ts%22%2C%22path%22%3A%22%2FUsers%2Fneryalexisorellana%2FDocuments%2FdevProjects%2Fjs%2Fnode%2Fprojectx-be-node%2FswaggerConfig.ts%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A2%2C%22character%22%3A0%7D%5D "swaggerConfig.ts") in [`swaggerConfig.ts`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fneryalexisorellana%2FDocuments%2FdevProjects%2Fjs%2Fnode%2Fprojectx-be-node%2FswaggerConfig.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/neryalexisorellana/Documents/devProjects/js/node/projectx-be-node/swaggerConfig.ts"). For example, to add a new server or change the API information, update the [`definition`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fneryalexisorellana%2FDocuments%2FdevProjects%2Fjs%2Fnode%2Fprojectx-be-node%2FswaggerConfig.ts%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fneryalexisorellana%2FDocuments%2FdevProjects%2Fjs%2Fnode%2Fprojectx-be-node%2FswaggerConfig.ts%22%2C%22path%22%3A%22%2FUsers%2Fneryalexisorellana%2FDocuments%2FdevProjects%2Fjs%2Fnode%2Fprojectx-be-node%2FswaggerConfig.ts%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A3%2C%22character%22%3A2%7D%5D "swaggerConfig.ts") property within the [`swaggerOptions`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Fneryalexisorellana%2FDocuments%2FdevProjects%2Fjs%2Fnode%2Fprojectx-be-node%2FswaggerConfig.ts%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Fneryalexisorellana%2FDocuments%2FdevProjects%2Fjs%2Fnode%2Fprojectx-be-node%2FswaggerConfig.ts%22%2C%22path%22%3A%22%2FUsers%2Fneryalexisorellana%2FDocuments%2FdevProjects%2Fjs%2Fnode%2Fprojectx-be-node%2FswaggerConfig.ts%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A2%2C%22character%22%3A0%7D%5D "swaggerConfig.ts").

For more detailed customization, refer to the [Swagger Documentation](https://swagger.io/docs/specification/about/).

## License

This project is licensed under the MIT License.
