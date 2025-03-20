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
