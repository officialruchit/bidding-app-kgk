# Bidding App

## Overview
The Bidding App is a web application that enables users to participate in real-time bidding on various items. It provides functionalities for user registration, authentication, item listing, bidding, and notification management. The app is built using Node.js and Express.js for the backend, PostgreSQL for the database, Sequelize as the ORM, and Socket.IO for real-time bid updates.

## Features
- **User Registration and Authentication**: Users can register and log in securely to the application.
- **Item Management**: Items available for bidding are displayed, and new items can be added to the platform.
- **Bidding System**: Users can place bids on items of interest.
- **Real-time Notifications**: Users receive instant notifications about bid updates and other relevant information.
- **User Profiles**: Authenticated users can view and manage their profiles.

## Technologies Used
- **Backend Framework**: Node.js, Express.js
- **Database**: PostgreSQL
- **Object-Relational Mapping (ORM)**: Sequelize
- **Real-time Communication**: Socket.IO
- **Authentication**: JSON Web Tokens (JWT)
- **Environment Variables Management**: dotenv

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/officialruchit/bidding-app-kgk.git
   cd bidding-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and define the following variables:
   ```env
   PORT=3333
   DB_NAME=kgk
   DB_USER=postgres
   DB_PASSWORD=12345
   DB_HOST=postgres
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Database Setup**:
   - Make sure you have PostgreSQL installed and running.
   - Create a new database using the provided database name in the `.env` file.

6. **Start the Server**:
   ```bash
   nodemon index.js
   ```

## API Endpoints
- **User Routes**:
  - POST /users/register: Register a new user
  - POST /users/login: Authenticate a user and generate a JWT token
  - GET /users/profile: Retrieve the profile of the logged-in user (authentication required)
- **Item Routes**:
  - GET /items: Retrieve a list of items available for bidding
  - GET /items/:id - Retrieve a single auction item by ID.
  - POST /items: Create a new auction item (Authenticated users, image upload)
  - PUT /items/:id: Update an auction item by ID (Authenticated users, only item owners or admins)
  - DELETE /items/:id: Delete an auction item by ID (Authenticated users, only item owners or admins)

- **Bid Routes**:
  - GET /items/:itemId/bids : Retrieve a list of bids
  - POST /items/:itemId/bids s: Place a new bid on an item (authentication required)
- **Notification Routes**:
  - GET /notifications: Retrieve notifications for the logged-in user (authentication required)
  - POST /notifications/mark-read: Mark notifications as read (authentication required)

## WebSocket Integration
The application uses Socket.IO for real-time bid updates, allowing users to receive instant notifications when new bids are placed on items they are interested in.

## Middleware
- **Authentication Middleware**: Verifies JWT tokens for protected routes.
- **Body Parser Middleware**: Parses incoming request bodies in JSON format.

## Directory Structure
```
.
├── config.js  # Database configuration
│          
├── controller
│   ├── userController.js
│   ├── itemController.js
│   ├── bidController.js
│   └── notificationsController.js
├── middleware
│   └── auth.js          # Authentication middleware
├── model
│   ├── user.js          # User model
│   ├── item.js          # Item model
│   └── bid.js           # Bid model
├── route
│   ├── userRoutes.js
│   ├── itemRoutes.js
│   ├── bidRoutes.js
│   └── notificationsRoutes.js
├── webSocketServer.js   # WebSocket server setup
├── .env                 # Environment variables
├── index.js               # Main application file
└── package.json         # Project metadata and dependencies
```

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributions
Contributions are welcome! Please create an issue or submit a pull request.

## Contact
For any questions or support, please contact [official.ruchit@gmail.com](mailto:official.ruchit@gmail.com).
