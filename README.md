# learning-management-system

## Description

A **Learning Management System (LMS)** backend API developed with **Node.js, Express.js, MongoDB, and Mongoose**.

The project provides a backend foundation for managing an online learning platform, including:

* Courses
* Modules
* Learning resources
* Course filtering and sorting
* REST API
* MongoDB database
* Swagger API documentation
* Error handling

The project follows a modular architecture using **controllers, services, models, routes, middlewares, and configuration**.

Future features such as authentication, enrollments, progress tracking, quizzes, and feedback can be integrated into the platform.

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

### 3. Start MongoDB with Docker

```bash
docker compose up -d
```

### 4. Configure environment variables

Create a `.env` file and configure your MongoDB connection and application port.

Example:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/lms
```

### 5. Run the seed

```bash
node run seed
```

### 6. Start the project

For development:

```bash
npm run dev
```

Or:

```bash
npm start
```

The API will be available at:

```text
http://localhost:3000
```

### 7. API Documentation

Swagger documentation is available at:

```text
http://localhost:3000/api-docs
```
