import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
} from "@mui/material";
import { getProducts } from "../services/api"; // Import the API call

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔵 Fetch Products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        console.log(data);
        setProducts(data); // Store API response
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
                      ${product.price.toFixed(2)}
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
