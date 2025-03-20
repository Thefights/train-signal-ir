import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
} from "@mui/material";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";

const tempProducts = [
  {
    id: 1,
    name: "Laptop X500",
    description: "Intel i9, 16GB RAM, 512GB SSD",
    price: 1299.99,
  },
  {
    id: 2,
    name: "Smartphone S20",
    description: "128GB, OLED Display, 5G",
    price: 899.99,
  },
  {
    id: 3,
    name: "Wireless Headphones",
    description: "Noise Cancelling, Bluetooth 5.0",
    price: 199.99,
  },
];

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setProducts(tempProducts); // Load temp products (replace with API later)
  }, []);

  const handleOpenUpdate = (product) => {
    setSelectedProduct(product); // Set the selected product for editing
    setOpenUpdate(true);
  };

  return (
    <Container maxWidth="md">
      <h2>Product Management</h2>

      {/* Add Product Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAdd(true)}
        sx={{ mb: 2 }}
      >
        Add Product
      </Button>

      {/* Add Product Popup */}
      <Dialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        fullWidth
        maxWidth="sm"
      >
        <AddProduct onClose={() => setOpenAdd(false)} />
      </Dialog>

      {/* Product Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>
                  {/* Open Update Dialog */}
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpenUpdate(product)}
                    sx={{ mr: 1 }}
                  >
                    Update
                  </Button>

                  {/* Delete Button (Placeholder) */}
                  <Button variant="outlined" color="error">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Product Popup */}
      <Dialog
        open={openUpdate}
        onClose={() => setOpenUpdate(false)}
        fullWidth
        maxWidth="sm"
      >
        {selectedProduct && (
          <UpdateProduct
            productId={selectedProduct.id}
            onClose={() => setOpenUpdate(false)}
          />
        )}
      </Dialog>
    </Container>
  );
};

export default ProductManagement;
