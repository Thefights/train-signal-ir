import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
} from "@mui/material";

import { getProducts } from "../services/api";
import {
  startSignalRConnection,
  stopSignalRConnection,
} from "../services/signalRService.js";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
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
    return () => {
      stopSignalRConnection();
    };
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Product List
      </Typography>

      <Grid container spacing={3}>
        {loading ? (
          <Typography variant="h6" align="center" sx={{ width: "100%" }}>
            Loading products...
          </Typography>
        ) : products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {product.description}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ${Number(product.price).toFixed(2)}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      Product ID: {product.id}
                    </Typography>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center" sx={{ width: "100%" }}>
            No products found.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Product;
