# File uploader

This project is developed for education purpose as part of the [The Odin Project](https://www.theodinproject.com) NodeJS course.

## Overview

File uploader is a fullstack web app where an authenticated user can upload, share and download files.

The project follows a monorepo structure with separate `api` and `web` applications, sharing common types via the `shared` directory.

## Learning Goals

The main goal of the project is to practice using PrismaORM. As a fullstack application, it also focuses on practice:

- database design
- authentication and persist the session in the database
- handling files
- generate shareable links
- use cloud storage services (Cloudinary or Supabase)

## Features

- User authentication
- Persist authentication session in database
- Create, read, update, and delete folders
- Upload files to default or custom folders
- File validation (size, number of files)
- View file detail information
- Download files
- Share folders to anyone by generating links which are specified to a duration.

## Tech Stack

**Languages**

- TypeScript

**Backend**

- NodeJs
- Express
- PostgreSQL
- Prisma ORM
- Passport.js
- bcryptjs
- Prisma session store library
- Multer middleware

**Frontend**

- React
- React Router
- CSS

**Cloud Storage**

- Supabase

## Project Structure

- api/ &rarr; backend
- web/ &rarr; frontend
- shared/ &rarr; sharing type between api and web

## API Endpoints

### Auth

- POST /auth/signup
- POST /auth/login
- GET /logout

### Folder

**Create New Folder**

- Endpoint: **POST** /folders
- Request body

  ```json
  {
    "name": "folder name"
  }
  ```

- Response

  ```json
  {
    "data": {
      "id": "string",
      "name": "folder name",
      "createdAt": "Date"
    }
  }
  ```

**Get All Folders**

- Endpoint: **GET** /folders
- Response object:

  ```json
  {
    "data": [
      {
        "id": "string",
        "name": "folder name",
        "createdAt": "Date"
      }
    ]
  }
  ```

**Edit Folder**

- Endpoint: **PUT** /folders/:folderId
- Request

  ```json
  {
    "name": "Updated folder name"
  }
  ```

- Response

  ```json
  {
    "data": {
      "id": "string",
      "name": "Updated folder name",
      "createdAt": "Date"
    }
  }
  ```

**Delete Folder**

- Endpoint: **DELETE **/folders/:folderId
- response

  ```json
  {
    "message": "Folder deleted successfully";
  }
  ```

### File handling

Files can be only uploaded to a default or a custom folder.

**Upload files**

- Endpoint: **POST** /folders/:folderId/files
- Request
  - Content-Type: `multipart/form-data`
  - Fields:
    - `files`: one or more files
- Response

  ```json
  {
    "data": [
      {
        "id": "string",
        "filename": "original file name",
        "size": "file size (integer)",
        "type": "content-type",
        "uploadedAt": "date",
        "folderId": "string"
      }
    ]
  }
  ```

**Get folder files**

- Endpoint: **GET** /folders/:folderId/files
- Response

  ```json
  {
    "data": [
      {
        "id": "string",
        "filename": "original file name",
        "size": "file size (integer)",
        "type": "content-type",
        "uploadedAt": "date",
        "folderId": "string"
      }
    ]
  }
  ```

**Download File**

- Endpoint: **GET** /folders/:folderId/files/:fileId
- Response
  - Content-type: file mime type
  - Content-disposition: `attachment; filename="filename.pdf"`
  - Body: binary file stream

### Folder Sharing

- POST /shares &rarr; Generate shareable link
- GET /shares/:folderId &rarr; get shared folder

## Database Schema

This project uses PostgreSQL as the database and Prisma ORM for schema management and queries. Files are stored in Supabase, and only their metadata and storage references are saved in the database.

The database consists of the following tables:

**Tables**

- **users**: store user accounts and authentication data. columns:
  - id, email, password, createdAt

- **folders**: store folders. Each folders belong to a user. columns:
  - id, folders, ownerId, createdAt

- **files**: Stores file metadata (name, size, type) and Supabase storage references. Each file belongs to a folder. columns:
  - id, filename, size, type, uploadedAt, url folderId

- **shares**: Stores shareable links for folders, including expiration time and access token. columns:
  - id, token, resourceId, createdAt, expiresAt

- **Session**: store authentication sessions. columns
  - id, sid, userId, expiresAt
