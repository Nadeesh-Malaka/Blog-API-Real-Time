# Blog API with Real-Time Updates

This is a Node.js-based blog API with user management, post management, and real-time updates using WebSocket (Socket.IO). It follows a layered architecture, uses MySQL with Sequelize ORM, and implements JWT authentication with security best practices.

## Features
- User registration and login with JWT authentication.
- CRUD operations for blog posts with ownership restrictions.
- Real-time updates for post creation, updates, and deletions via WebSocket.
- Input validation and global error handling.
- Secure password hashing with `bcryptjs` and JWT stored in HTTP-only cookies.

## Technologies
- **Backend**: Node.js, Express
- **Database**: MySQL with Sequelize ORM
- **Authentication**: JWT, `bcryptjs`
- **Real-Time**: Socket.IO
- **Validation**: Joi
- **Other**: `cors`, `cookie-parser`

## Setup

### Prerequisites
- Node.js (v20.x or later)
- MySQL server
- npm (comes with Node.js)

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Nadeesh-Malaka/Blog-API-Real-Time.git
   cd TASK

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:

   - Create a `.env` file in the root directory with the following content:

     ```plaintext
     DB_NAME=blog_db
     DB_USER=root
     DB_PASS=yourpassword
     DB_HOST=localhost
     DB_DIALECT=mysql
     PORT=5000
     JWT_SECRET=yourjwtsecret
     ```

   - Replace `yourpassword` with your MySQL password and `yourjwtsecret` with a secure secret key.

4. **Set Up the Database**:

   - Create a MySQL database named `blog_db`:

     ```sql
     CREATE DATABASE blog_db;
     ```

   - The application will sync the schema on startup using Sequelize.

5. **Run the Server**:

   ```bash
   npx nodemon server.js
   ```

   - Expected output:

     ```plaintext
     ✅ Database & tables synced!
     🚀 Server running on port 5000
     ```

## Endpoints

### Authentication

- **POST /auth/register**

  - **Body**:

    ```json
    { "username": "string", "email": "string", "password": "string" }
    ```

  - **Response**: `201 Created` with user data

  - **Description**: Registers a new user.

- **POST /auth/login**

  - **Body**:

    ```json
    { "email": "string", "password": "string" }
    ```

  - **Response**: `200 OK` with JWT token in HTTP-only cookie

  - **Description**: Logs in a user and issues a JWT token.

### Blog Posts

- **GET /posts**

  - **Headers**: `Authorization: Bearer <token>`

  - **Response**: `200 OK` with array of posts

  - **Description**: Fetches all posts.

- **POST /posts**

  - **Headers**: `Authorization: Bearer <token>`

  - **Body**:

    ```json
    { "title": "string", "content": "string" }
    ```

  - **Response**: `201 Created` with new post

  - **Description**: Creates a new post (authenticated users only).

- **GET /posts/:id**

  - **Headers**: `Authorization: Bearer <token>`

  - **Response**: `200 OK` with post details

  - **Description**: Retrieves a post by ID.

- **PUT /posts/:id**

  - **Headers**: `Authorization: Bearer <token>`

  - **Body**:

    ```json
    { "title": "string", "content": "string" }
    ```

  - **Response**: `200 OK` with updated post

  - **Description**: Updates a post (authenticated user and owner only).

- **DELETE /posts/:id**

  - **Headers**: `Authorization: Bearer <token>`

  - **Response**: `204 No Content`

  - **Description**: Deletes a post (authenticated user and owner only).

## Real-Time Updates

- **WebSocket Server**: `ws://localhost:5000`

- **Events**:

  - `postCreated`: Emitted when a new post is created.
  - `postUpdated`: Emitted when a post is updated.
  - `postDeleted`: Emitted when a post is deleted.

- **Testing**:

  1. Install `http-server` globally:

     ```bash
     npm install -g http-server
     ```

  2. Start a static server:

     ```bash
     npx http-server -p 3000
     ```

  3. Open `http://localhost:3000/test-websocket.html` in your browser.

  4. Open the Developer Tools (F12) and check the Console tab or the `<ul id="events">` list.

  5. Use Postman to create, update, or delete a post (e.g., `POST /posts`) and observe the real-time events.

## File Structure

```
Blog-API-Real-Time/
├── config/              # Database configuration (e.g., database.js)
├── controllers/         # HTTP request handlers (e.g., AuthController.js)
├── dtos/                # Data Transfer Objects (e.g., UserDTO.js)
├── middleware/          # Authentication and validation middleware (e.g., auth.js, validate.js)
├── models/              # Sequelize models (e.g., User.js, Post.js, index.js)
├── public/              # Static files (e.g., test-websocket.html)
├── routes/              # Route definitions (e.g., auth.js, posts.js)
├── services/            # Business logic (e.g., PostService.js, UserService.js)
├── repositories/        # Database interactions (e.g., PostRepository.js, UserRepository.js)
├── .env                 # Environment variables (not tracked)
├── .gitignore           # Git ignore file
├── package.json         # Project dependencies
├── package-lock.json    # Locked dependency versions
├── server.js            # Entry point
└── README.md            # This file
```

## Testing

- Use Postman to test all endpoints.
- Include the JWT token in the `Authorization` header as `Bearer <token>` for protected routes.
- Verify WebSocket functionality with `test-websocket.html`.

## Deployment Notes

- For production, use Sequelize migrations instead of `sync({ alter: true })` to manage schema changes.
- Configure a production-ready WebSocket server (e.g., with a reverse proxy like Nginx).
- Ensure `.env` is securely managed and not committed to version control.

## Contributors

- Nadeesh Malaka



##

<p align="center">
  Happy Coding! 🚀
</p>

<p align="center">
  May your code be bug-free and your deployments smooth. Happy coding, and enjoy building amazing things! ✨
</p>
