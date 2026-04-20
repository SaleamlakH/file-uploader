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

**User authentication**

- POST /auth/signup
- POST /auth/login

**Folder management**

- POST /folders &rarr; create folder
- GET /folders/:folderId &rarr; get folder
- PUT /folders/:folderId &rarr; edit folder
- DELETe /folders/:folderId &rarr; delete folder

**Folder Sharing**

- POST /shares &rarr; Generate shareable link
- GET /shares/:folderId &rarr; get shared folder

**File handling**

Files can be only uploaded to a default or a custom folder.

- POST /folders/:folderId/files &rarr; post a file or files
- GET /files/:fileId &rarr; get details of a file
- GET /files/:fileId/download &rarr; download file

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
