
# ProjectX Backend Node.js

This project is a backend application built with Node.js and Sequelize. It uses Docker to run a MariaDB database.

## Table of Contents

- [Project Setup](#project-setup)
- [Running the Application](#running-the-application)
- [Database Migrations](#database-migrations)
- [Deployment](#deployment)
- [Listing Routes](#listing-routes)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Swagger API Documentation](#swagger-api-documentation)
- [License](#license)

## Project Setup

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

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
yarn install
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

Connect to the MariaDB server:

```bash
mysql -u root -p
```

Create a new database:

```sql
CREATE DATABASE projectxdev;
```

## Running the Application

Start the application using Nodemon:

```bash
yarn start
```

## Database Migrations

### Running Migrations

To run all pending migrations:

```bash
yarn run db:migrate
```

### Undoing Migrations

To undo the last migration:

```bash
yarn run db:migrate:undo
```

### Refreshing Migrations

To undo all migrations and then run them again:

```bash
yarn run db:migrate:refresh
```

## Deployment

To deploy changes to the production server and restart the PM2 process:

1. **Build the project**:
   ```bash
   yarn build
   ```

2. **Restart the PM2 processes**:
   ```bash
   pm2 restart reco-api-https
   ```

3. **Monitor logs**:
   ```bash
   pm2 logs reco-api-https
   ```

## Listing Routes

To list all routes defined in the application:

```bash
yarn run routes:list
```

## Testing

To run tests (currently, no tests are specified):

```bash
yarn test
```


## Creating a New Model and Migration

To create a new model and its corresponding migration using the command line, follow these steps:

### Generate a New Model

Use the Sequelize CLI to generate a new model. Replace `ModelName` with the name of your model and specify the attributes for the model.

```bash
yarn sequelize model:generate --name ModelName --attributes attribute1:type,attribute2:type
```

For example, to create a `User` model with `username` and `email` attributes:

```bash
yarn sequelize model:generate --name User --attributes username:string,email:string
```

This command will create two files:
- A model file in the `src/api/v1/models` directory.
- A migration file in the `migrations` directory.

### Run the Migration

After generating the model and migration files, run the migration to create the corresponding table in the database:

```bash
yarn run db:migrate
```

This will execute the migration and create the new table based on the model definition.

### Undoing the Migration

If you need to undo the migration, you can use the following command:

```bash
yarn run db:migrate:undo
```

This will revert the last migration that was run.


By following these steps, you can easily create and manage models and migrations in your ProjectX Backend Node.js application.

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

1. Ensure the server is running by executing `yarn start` in your terminal.
2. Open a web browser and navigate to `http://localhost:8000/api-docs`.

This will open the Swagger UI, where you can see all available API endpoints, their request parameters, and responses. You can also try out the API directly from this interface by sending requests to the server.

### Generating Swagger Documentation

The Swagger documentation is automatically generated from the source code. The configuration for Swagger is defined in `swaggerConfig.ts`. The key options include:

- **OpenAPI Version**: Specifies the OpenAPI Specification (OAS) version used (currently `3.0.0`).
- **Info**: Provides metadata about the API such as the title, version, and description.
- **APIs**: Points to the location of your route files where Swagger will look to generate documentation based on JSDoc comments.

To ensure your API changes are reflected in the Swagger documentation, simply update the JSDoc comments in your route files and restart the server.

### Customizing Swagger Documentation

You can customize the Swagger documentation by modifying the `swaggerOptions` in `swaggerConfig.ts`. For example, to add a new server or change the API information, update the `definition` property within the `swaggerOptions`.

For more detailed customization, refer to the [Swagger Documentation](https://swagger.io/docs/specification/about/).

## License

This project is licensed under the MIT License.

