import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Modal,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    publicationDate: "",
  });
  const [searchParams, setSearchParams] = useState({
    title: "",
    author: "",
    genre: "",
    publicationDate: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");

  const fetchBooks = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/books", {
        headers: { Authorization: `Bearer ${token}` },
        params: searchParams,
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }, [token, searchParams]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const addBook = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/books",
        newBook,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBooks([...books, response.data]);
      setNewBook({
        title: "",
        author: "",
        isbn: "",
        genre: "",
        publicationDate: "",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error(
        "Error adding book:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      console.error(
        "Error deleting book:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleSearchChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearchSubmit = async () => {
    try {
      const response = await axios.get("http://localhost:3000/books", {
        headers: { Authorization: `Bearer ${token}` },
        params: searchParams,
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Books
      </Typography>
      <Box sx={{ marginBottom: "20px" }}>
        <TextField
          label="Search by Title"
          name="title"
          value={searchParams.title}
          onChange={handleSearchChange}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "10px" }}
        />
        <TextField
          label="Search by Author"
          name="author"
          value={searchParams.author}
          onChange={handleSearchChange}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "10px" }}
        />
        <TextField
          label="Search by Genre"
          name="genre"
          value={searchParams.genre}
          onChange={handleSearchChange}
          variant="outlined"
          fullWidth
          sx={{ marginBottom: "10px" }}
        />
        <TextField
          label="Search by Publication Date"
          name="publicationDate"
          type="date"
          value={searchParams.publicationDate}
          onChange={handleSearchChange}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ marginBottom: "10px" }}
        />
        <Button variant="contained" onClick={handleSearchSubmit}>
          Search
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {books.map((book) => (
          <Card key={book._id} sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {book.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {book.author}
              </Typography>
              <Typography variant="body2">ISBN: {book.isbn}</Typography>
              <Typography variant="body2">Genre: {book.genre}</Typography>
              <Typography variant="body2">
                Publication Date:{" "}
                {new Date(book.publicationDate).toLocaleDateString()}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => deleteBook(book._id)}>
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
      <Button
        variant="contained"
        onClick={() => setIsModalOpen(true)}
        sx={{ marginTop: "20px" }}
      >
        Add Book
      </Button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            padding: "20px",
            backgroundColor: "white",
            maxWidth: 600,
            margin: "auto",
            marginTop: "10%",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Add a New Book
          </Typography>
          <TextField
            label="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            label="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            label="ISBN"
            value={newBook.isbn}
            onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            label="Genre"
            value={newBook.genre}
            onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
            variant="outlined"
            fullWidth
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            label="Publication Date"
            type="date"
            value={newBook.publicationDate}
            onChange={(e) =>
              setNewBook({ ...newBook, publicationDate: e.target.value })
            }
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{ marginBottom: "10px" }}
          />
          <Button variant="contained" onClick={addBook}>
            Add Book
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default BookList;
