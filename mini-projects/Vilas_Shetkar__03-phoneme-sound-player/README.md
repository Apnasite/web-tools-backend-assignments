# Phoneme Sound Player

## Overview
The Phoneme Sound Player is a web application that allows users to play phoneme sounds and visualize their pronunciation. The application now includes user authentication features, enabling users to register, log in, and securely access phoneme activities.

## Features
- **User Registration**: New users can create an account by providing a username, password, and mobile number.
- **User Login**: Existing users can log in to access their phoneme activities.
- **JWT Authentication**: The application uses JSON Web Tokens (JWT) to secure routes and manage user sessions.
- **Phoneme Sound Player**: Users can input words and hear the corresponding phoneme sounds.

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd phoneme-sound-player
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Environment Variables
Create a `.env` file in the root directory and add the following variables:
```
MONGODB_URI=mongodb://localhost:27017/phoneme-sound-player
JWT_SECRET=your_jwt_secret_key
```

### Running the Application
1. Start the server:
   ```
   node index.js
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

### User Registration
- **Endpoint**: `POST /register`
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string",
    "mobile": "string"
  }
  ```

### User Login
- **Endpoint**: `POST /login`
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt_token"
  }
  ```

### Save Phoneme Activity
- **Endpoint**: `POST /phoneme-activity`
- **Authorization**: Bearer token required
- **Request Body**:
  ```json
  {
    "word": "string",
    "phonemes": ["string"],
    "timestamp": "date"
  }
  ```

## Frontend Components
- **Login Popup**: A modal for users to log in.
- **Registration Popup**: A modal for new users to register.
- **Phoneme Sound Player**: The main interface for interacting with phoneme sounds.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.