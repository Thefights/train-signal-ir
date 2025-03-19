import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Stack spacing={2}>
      <Button onClick={() => navigate("/product")}>Product</Button>
      <Button onClick={() => navigate("/product-management")}>
        Product Management
      </Button>
    </Stack>
  );
};
export default Home;

// import { useEffect, useState } from "react";
// import { getPosts } from "../services/api";

// const Home = () => {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     getPosts().then((data) => setPosts(data));
//   }, []);

//   return (
//     <div>
//       <h1>Home Page</h1>
//       <ul>
//         {posts.map((post) => (
//           <li key={post.id}>{post.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Home;
