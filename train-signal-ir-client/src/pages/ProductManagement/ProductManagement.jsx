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
import {
  startSignalRConnection,
  stopSignalRConnection,
} from "../../services/signalRService";

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

    startSignalRConnection({
      onAdd: (product) =>
        setProducts((prev) =>
          prev.some((p) => p.id === product.id) ? prev : [...prev, product]
        ),
      onUpdate: (updated) =>
        setProducts((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        ),
      onDelete: (id) => setProducts((prev) => prev.filter((p) => p.id !== id)),
    });
    // Clean up on unmount
    return () => {
      stopSignalRConnection();
    };
  }, []);

  // Open dialog update
  const handleOpenUpdate = (product) => {
    setSelectedProduct(product);
    setOpenUpdate(true);
  };

  // Delete product
  const handleDeleteProduct = async (productId) => {
    await deleteProduct(productId);
  };

  return (
    <Container maxWidth="md">
      <h2>Product Management</h2>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAdd(true)}
        sx={{ mb: 2 }}
      >
        Add Product
      </Button>

      <Dialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        fullWidth
        maxWidth="sm"
      >
        <AddProduct onClose={() => setOpenAdd(false)} />
      </Dialog>

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
                  ${product.price ? Number(product.price).toFixed(2) : "0.00"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpenUpdate(product)}
                    sx={{ mr: 1 }}
                  >
                    Update
                  </Button>

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

      <Dialog
        open={openUpdate}
        onClose={() => setOpenUpdate(false)}
        fullWidth
        maxWidth="sm"
      >
        {selectedProduct && (
          <UpdateProduct
            product={selectedProduct}
            onClose={() => setOpenUpdate(false)}
          />
        )}
      </Dialog>
    </Container>
  );
};

export default ProductManagement;
