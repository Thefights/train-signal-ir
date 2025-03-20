import * as signalR from "@microsoft/signalr";
import { useEffect, useContext } from "react";
import { ProductContext } from "./context/ProductContext";

export const useSignalR = () => {
  const { setProducts } = useContext(ProductContext);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:7096/productHub")
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .catch((err) => console.error("SignalR Connection Error:", err));

    connection.on("ReceiveProductAdd", (product) => {
      setProducts((prevProducts) => [...prevProducts, product]);
    });

    connection.on("ReceiveProductUpdate", (product) => {
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === product.id ? product : p))
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
  }, [setProducts]);
};
