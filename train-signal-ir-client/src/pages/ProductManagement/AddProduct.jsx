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

//URL back-end
const API_BASE_URL = "http://localhost:8080/product-management";

const AddProduct = ({ onClose }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const newProduct = {
        ...product,
        price: parseFloat(product.price),
      };

      const response = await axios.post(API_BASE_URL, newProduct);

      if (response.status === 200) {
        onClose();
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setError("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
        <Typography variant="h5" gutterBottom>
          Add New Product
        </Typography>
        {error && <Typography color="error">{error}</Typography>}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="dense"
            onChange={handleChange}
            value={product.name}
            required
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            margin="dense"
            onChange={handleChange}
            value={product.description}
            required
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            margin="dense"
            onChange={handleChange}
            value={product.price}
            required
          />

          <DialogActions>
            <Button onClick={onClose} color="secondary" disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Product"}
            </Button>
          </DialogActions>
        </form>
      </Paper>
    </Container>
  );
};

export default AddProduct;
