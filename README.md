# Library Management System

A comprehensive Library Management System built with React, Node.js, Express, and MongoDB. This project allows users to manage books and members efficiently, including adding, searching, and deleting records.

## Features

- **Book Management**: Add, search, view, and delete books.
- **Member Management**: Add, search, view, and delete members.
- **Dark Mode**: Toggle between light and dark themes for a better user experience.

## Technologies Used

- **Frontend**: React, Material-UI
- **Backend**: Node.js, Express.js, MongoDB
- **Styling**: Material-UI, Bootstrap

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- Node.js (v14 or above)
- MongoDB

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/library-management-system.git
   cd library-management-system
   ```

2. **Install dependencies for the backend**

   ```bash
   cd backend
   npm install
   ```

3. **Install dependencies for the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**

   ```bash
   cd backend
   npm start
   ```

   The backend server will run on `http://localhost:3000`.

2. **Start the frontend server**

   ```bash
   cd ../frontend
   npm start
   ```

   The frontend server will run on `http://localhost:3001`.

### API Endpoints

- **Books**

  - `POST /books`: Create a new book
  - `GET /books`: Get all books (with optional search parameters)
  - `DELETE /books/:id`: Delete a book by ID

- **Members**
  - `POST /members`: Create a new member
  - `GET /members`: Get all members (with optional search parameters)
  - `DELETE /members/:id`: Delete a member by ID

### Usage

1. **Add a Book**: Use the "Add Book" button to open a modal and add a new book with title, author, ISBN, genre, and publication date.
2. **Search Books**: Use the search fields to filter books by title, author, genre, or publication date.
3. **Delete a Book**: Click the "Delete" button on a book card to remove it from the library.
4. **Add a Member**: Use the "Add Member" button to open a modal and add a new member with name, email, and phone number.
5. **Search Members**: Use the search fields to filter members by name or email.
6. **Delete a Member**: Click the "Delete" button on a member card to remove them from the library.
7. **Toggle Dark Mode**: Use the dark mode toggle button in the header to switch between light and dark themes.

## License

This project is licensed under the MIT License.

## Contact

 For any inquiries or feedback, please contact pg4009355@gmail.com.

📚✨
