# Final Store Project

This project is a full-stack web application using Angular for the frontend, Express.js for the backend, and MongoDB for data storage. It includes features like a shopping cart and a simple task management system.

## Technologies Used

- Angular 13 with Bootstrap for the frontend
- Node.js with Express.js for the backend
- MongoDB for the database
- RESTful APIs for communication between frontend and backend
- Angular CLI for building and running the frontend
- The `concurrently` package to run both servers at the same time

## Project Structure Overview

The project is organized as follows:

- `src/`: Contains the Angular application (components, routing, styling, etc.)
- `server/`: Contains the Express backend with all the API logic
- `proxy.conf.json`: Used to proxy Angular requests to the backend during development
- `angular.json`: Angular project configuration
- `package.json`: Defines project scripts and dependencies
- `tsconfig.json`: TypeScript configuration

## Getting Started

### Step 1: Install dependencies

Run the following command in the root of the project:

```
npm install
```

### Step 2: Start MongoDB

Make sure you have MongoDB installed and running locally. By default, the backend connects to:

```
mongodb://localhost:27017/store
```

You can start MongoDB using the `mongod` command or with a graphical tool like MongoDB Compass.

### Step 3: Run the Application

To start both the Angular frontend and the Express backend at the same time, simply run:

```
npm start
```

- The Angular app will be available at: http://localhost:4200
- The backend API will run on: http://localhost:3000

## Features

### Shopping Cart

- Users can add or remove items.
- Item quantities are tracked.
- Cart data is stored in the MongoDB database.

### Task Manager

- Users can add, edit, delete, and clear tasks.
- All tasks are stored in the database.

## Additional Notes

- All backend API routes start with `/api`
- The Angular app uses a proxy configuration (`proxy.conf.json`) to handle API calls locally.
- Development and production configurations are already set up in `angular.json`.

This setup allows for a seamless development experience with synchronized frontend and backend environments.
