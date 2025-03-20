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

const UpdateProduct = ({ product, onClose }) => {
  // Khởi tạo state với dữ liệu sản phẩm được truyền từ component cha
  const [updatedProduct, setUpdatedProduct] = useState(product);

  // Cập nhật lại state nếu prop product thay đổi
  useEffect(() => {
    if (product) {
      setUpdatedProduct(product); // ✅ Chỉ cập nhật khi product hợp lệ
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
      .put("https://localhost:7096/product-management", {
        // Giả định rằng updatedProduct đã có thuộc tính id
        ...updatedProduct,
        price: parseFloat(updatedProduct.price),
      })
      .then(() => {
        onClose(); // Đóng dialog sau khi cập nhật thành công
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
            value={updatedProduct.description}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            margin="dense"
            value={updatedProduct.price}
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
