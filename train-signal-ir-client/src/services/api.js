import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com"; // URL giả lập

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getPosts = async () => {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (error) {
    console.error("Error fetching posts", error);
    return [];
  }
};
