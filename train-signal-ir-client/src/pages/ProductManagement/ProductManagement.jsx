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
import { getProducts, deleteProduct } from "../../services/api";
import * as signalR from "@microsoft/signalr";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchData();
    setupSignalR();
  }, []);

  // Setup SignalR for real-time updates
  const setupSignalR = () => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7096/productHub")
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .catch((err) => console.error("SignalR Connection Error:", err));

    connection.on("ReceiveProductAdd", (product) => {
      setProducts((prevProducts) => [...prevProducts, product]);
    });

    connection.on("ReceiveProductUpdate", (updatedProduct) => {
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === updatedProduct.id ? updatedProduct : p
        )
      );
    });

    connection.on("ReceiveProductDelete", (productId) => {
      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== productId)
      );
    });

    return () => {
      connection.stop();
    };
  };

  // Handle opening the update dialog
  const handleOpenUpdate = (product) => {
    setSelectedProduct(product);
    setOpenUpdate(true);
  };

  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    const success = await deleteProduct(productId);
    if (success) {
      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== productId)
      );
    }
  };

  // Handle product addition
  const handleProductAdded = (newProduct) => {
    setProducts([...products, newProduct]);
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

      {/* Add Product Dialog */}
      <Dialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        fullWidth
        maxWidth="sm"
      >
        <AddProduct
          onClose={() => setOpenAdd(false)}
          onProductAdded={handleProductAdded}
        />
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
                <TableCell>
                  $
                  {product.price !== undefined
                    ? Number(product.price).toFixed(2)
                    : "0.00"}
                </TableCell>
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

                  {/* Delete Button */}
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Product Dialog (Single Instance) */}
      <Dialog
        open={openUpdate}
        onClose={() => setOpenUpdate(false)}
        fullWidth
        maxWidth="sm"
      >
        {selectedProduct && (
          <UpdateProduct
            product={selectedProduct} // Pass the complete product object
            onClose={() => setOpenUpdate(false)}
          />
        )}
      </Dialog>
    </Container>
  );
};

export default ProductManagement;
