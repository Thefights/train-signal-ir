import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  DialogActions,
} from "@mui/material";

const AddProduct = ({ onClose }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/products", product)
      .then(() => {
        onClose(); // Close popup on success
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
        <Typography variant="h5" gutterBottom>
          Add New Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="dense"
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            margin="dense"
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            margin="dense"
            onChange={handleChange}
            required
          />

          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Add Product
            </Button>
          </DialogActions>
        </form>
      </Paper>
    </Container>
  );
};

export default AddProduct;
