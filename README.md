# Learning Management System

## Description

A **Learning Management System (LMS)** backend API developed with **Node.js, Express.js, MongoDB, and Mongoose**.

The project provides a backend foundation for managing:

* Courses
* Modules
* Learning resources
* Course filtering and sorting
* REST API
* Swagger API documentation
* Error handling

The project follows a modular architecture using **controllers, services, models, routes, middlewares, and configuration**.

## How to Run the Project

### 1. Clone the repository

```bash
git clone <repository-url>
cd lms_projet
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file at the root of the project:

```env
MONGO_URI=mongodb://mongodb:27017/lms_projet
```

### 4. Start the project with Docker

```bash
docker compose up --build
```

This starts:

* **Node.js / Express API**
* **MongoDB**

### 5. Run the seed

Insert the initial data into MongoDB:

```bash
docker compose exec api npm run seed
```

### 6. Access the API

The API is available at:

```text
http://localhost:3500
```

### 7. Swagger Documentation

API documentation is available at:

```text
http://localhost:3500/swagger/
```
