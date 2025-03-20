import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
} from "@mui/material";

// Dummy 10 products (Replace with API call later)
const productData = [
  {
    id: 1,
    name: "Laptop X500",
    description: "Intel i9, 16GB RAM",
    price: 1299.99,
  },
  {
    id: 2,
    name: "Smartphone S20",
    description: "128GB, OLED Display",
    price: 899.99,
  },
  {
    id: 3,
    name: "Wireless Headphones",
    description: "Noise Cancelling",
    price: 199.99,
  },
  { id: 4, name: "Gaming Mouse", description: "RGB, 12K DPI", price: 79.99 },
  {
    id: 5,
    name: "Mechanical Keyboard",
    description: "Cherry MX Red Switches",
    price: 129.99,
  },
  {
    id: 6,
    name: "4K Monitor",
    description: "27-inch, IPS Display",
    price: 499.99,
  },
  { id: 7, name: "External SSD", description: "1TB, USB-C", price: 149.99 },
  { id: 8, name: "Smartwatch", description: "Heart Rate, GPS", price: 249.99 },
  {
    id: 9,
    name: "Wireless Charger",
    description: "Fast Charging",
    price: 49.99,
  },
  {
    id: 10,
    name: "Portable Speaker",
    description: "Bluetooth, 10h Battery",
    price: 99.99,
  },
];

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulate API fetch (Replace with real API call)
    setTimeout(() => {
      setProducts(productData);
    }, 1000);
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Product List
      </Typography>
      <Grid container spacing={3}>
        {products.length > 0 ? (
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
            Loading products...
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Product;
