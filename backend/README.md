#  Student Bulk Upload & Student Management System

A scalable and production-ready backend application built with **Node.js, Express.js, and MongoDB** to simplify student data management through bulk Excel uploads, validation, and CRUD operations.

The application follows **MVC Architecture**, **Repository Pattern**, **Service Layer**, and reusable utilities to ensure clean, maintainable, and scalable code.

---

#  Features

##  Student Bulk Upload
- Upload Excel file
- Preview uploaded data
- Validate records before insertion
- Generate unique Student ID
- Confirm upload
- Bulk insert into MongoDB

---
##  Data Validation

The system validates every student record before saving.

### Required Field Validation
- Student Name
- Class
- Section
- Roll Number
- Admission ID
- Father Name
- Father Mobile Number
- Mother Name
- Mother Mobile Number
- Aadhaar Number
- Gender
- Date of Birth
- Year of Joining
- Communication Address
- Permanent Address

---

##  Duplicate Detection

### Excel Level
- Duplicate Admission ID
- Duplicate Aadhaar Number

### Database Level
- Duplicate Admission ID
- Duplicate Student Unique ID

---

##  Error Report

If validation fails:

- Invalid rows are identified
- Error messages are generated
- Error report is created
- User can correct and re-upload

---

#  Student Management

The application provides complete CRUD functionality.

- View Students
- Search Students
- Filter Students
- Update Student
- Delete Student
- Delete All Students

---

#  Search

Search students using:

- Student Name
- Admission ID

---

#  Dynamic Filters

Supports dynamic filtering by:

- Class
- Section
- Gender
- Year of Joining

---

#  Pagination
Supports:

- Page Number
- Limit
- Total Records
- Skip
- Sorting

---

# Project Architecture

The project follows a layered architecture.

```
Client
        │
        ▼
Routes
        │
        ▼
Controllers
        │
        ▼
Services
        │
        ▼
Repositories
        │
        ▼
MongoDB
```

---

#  Folder Structure
```
src
│
├── config
├── controllers
├── middleware
├── models
├── repositories
├── routes
├── services
├── utils
├── validators
│
├── app.js
└── server.js
```

---

#  Middleware

- CORS
- Helmet
- Compression
- Morgan
- Express JSON Parser
- Async Handler
- Global Error Handler

---

#  Utilities

- Excel Parser
- Unique ID Generator
- Upload Session Store
- Error Report Generator
- Response Utility
- Logger
- Custom ApiError

---

# Database

MongoDB Collections

### Student

Stores

- Personal Details
- Parent Details
- Admission Details
- Academic Details
- Address Information

Indexes

- Admission ID
- Unique ID

---

#  REST APIs

## Upload Module

| Method | Endpoint |
|---------|----------|
| POST | `/api/students/preview-upload` |
| POST | `/api/students/confirm-upload` |

---

## Student Management

| Method | Endpoint |
|---------|----------|
| GET | `/api/student-management` |
| GET | `/api/student-management/:id` |
| PUT | `/api/student-management/:id` |
| DELETE | `/api/student-management/:id` |
| DELETE | `/api/student-management/delete-all` |

---

## Dynamic Filters

| Method | Endpoint |
|---------|----------|
| GET | `/api/student-management/filters` |

---

## Error Report

| Method | Endpoint |
|---------|----------|
| GET | `/api/errors/download/:fileName` |

---

#  Performance Optimizations

- Repository Pattern
- Service Layer
- Promise.all()
- Bulk Insert
- Dynamic MongoDB Queries
- Upload Session Management
- Modular Code Structure

---

# Tech Stack

Backend

- Node.js
- Express.js

Database

- MongoDB
- Mongoose

Libraries

- Multer
- XLSX
- Helmet
- Compression
- Morgan
- CORS

---

# Project Status

### Completed

- Project Setup
- Excel Upload
- Validation
- Duplicate Validation
- Error Report Generation
- CRUD Operations
- Search
- Pagination
- Dynamic Filters
- Response Utility
- Async Handler
- Global Error Handler
- Repository Pattern
- Service Layer

---

#  Architecture Highlights

- MVC Architecture
- Repository Pattern
- Service Layer Pattern
- Centralized Error Handling
- Reusable Response Utility
- Async Middleware
- Modular Folder Structure
- Production-Ready Code Organization

---
## exprt excal 
| GET | `/api/students/export` |
