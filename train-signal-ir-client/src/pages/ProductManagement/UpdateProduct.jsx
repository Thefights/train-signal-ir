// UpdateProduct.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  DialogActions,
} from "@mui/material";

const API_BASE_URL = "http://localhost:8080/product-management";

const UpdateProduct = ({ product, onClose }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  useEffect(() => {
    if (product) {
      setUpdatedProduct(product);
    }
  }, [product]);

  const handleChange = (e) => {
    setUpdatedProduct({
      ...updatedProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(API_BASE_URL, {
        ...updatedProduct,
        price: parseFloat(updatedProduct.price),
      })
      .then((response) => {
        console.log("Updated product:", response.data);
        onClose();
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
        <Typography variant="h5" gutterBottom>
          Update Product
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="dense"
            value={updatedProduct.name || ""}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            margin="dense"
            value={updatedProduct.description || ""}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            margin="dense"
            value={updatedProduct.price || ""}
            onChange={handleChange}
            required
          />

          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Update Product
            </Button>
          </DialogActions>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateProduct;
