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

const UpdateProduct = ({ productId, onClose }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
  });

  // Fetch product details by ID when the popup opens
  useEffect(() => {
    if (productId) {
      axios
        .get(`http://localhost:5000/api/products/${productId}`)
        .then((res) => setProduct(res.data))
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [productId]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/products/${productId}`, product)
      .then(() => {
        onClose(); // Close popup on success
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
            value={product.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            margin="dense"
            value={product.description}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            margin="dense"
            value={product.price}
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
