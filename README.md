# MERN Based Social Media App

Building a social media app based on the MERN stack to learn more about MERN and its functionalities.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is a social media application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The purpose of this project is to gain a deeper understanding of the MERN stack and its capabilities by developing a fully functional social media platform.

## Features

- User authentication and authorization
- Profile creation and management
- Posting text and multimedia content
- Liking, commenting, and sharing posts
- Real-time notifications
- Responsive design for mobile and desktop

## Technologies Used

- MongoDB: NoSQL database for storing user and post data
- Express.js: Web application framework for building the backend API
- React.js: Frontend library for building the user interface
- Node.js: JavaScript runtime for executing server-side code

## Installation

To get a local copy up and running, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/SiddhanthMateDEV/webApp.git
    ```

2. Navigate to the project directory:
    ```bash
    cd mern-social-media-app
    ```

3. Install backend dependencies:
    ```bash
    cd backend
    npm install
    ```

4. Install frontend dependencies:
    ```bash
    cd ../frontend
    npm install
    ```

5. Create a `.env` file in the backend directory and add the following environment variables:
    ```env
    MONGO_URI=your_mongo_connection_string
    JWT_SECRET=your_jwt_secret
    ```

## Usage

1. Start the backend server:
    ```bash
    cd backend
    npm start
    ```

2. Start the frontend development server:
    ```bash
    cd ../frontend
    npm start
    ```

3. Open your browser and navigate to `http://localhost:8000` to see the application in action.

## Contributing

Contributions are welcome! If you have suggestions for improvements or want to report bugs, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
