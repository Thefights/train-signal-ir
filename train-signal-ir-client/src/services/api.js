import axios from "axios";

const API_BASE_URL = "https://localhost:7096/product-management"; // Adjust based on your backend

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔵 READ: Get all products
export const getProducts = async () => {
  try {
    const response = await api.get("/");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching products", error);
    return [];
  }
};

// 🟢 CREATE: Add a new product
export const createProduct = async (productData) => {
  try {
    const response = await api.post("/", productData);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error creating product", error);
    return null;
  }
};

// 🟡 UPDATE: Update an existing product
export const updateProduct = async (productId, updatedData) => {
  try {
    const response = await api.put("/", { id: productId, ...updatedData });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(`Error updating product ${productId}`, error);
    return null;
  }
};

// 🔴 DELETE: Remove a product
export const deleteProduct = async (productId) => {
  try {
    await axios.delete(`${API_BASE_URL}/${productId}`);
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    return false;
  }
};
