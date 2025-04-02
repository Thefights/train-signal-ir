import * as signalR from "@microsoft/signalr";

let connection = null;

export const startSignalRConnection = async ({ onAdd, onUpdate, onDelete }) => {
  if (!connection) {
    connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:8080/productHub")
      .withAutomaticReconnect()
      .build();

    connection.on("ReceiveProductAdded", onAdd);
    connection.on("ReceiveProductUpdated", onUpdate);
    connection.on("ReceiveProductDeleted", onDelete);
  }

  // ✅ Tránh start khi không ở trạng thái Disconnected
  if (connection.state === signalR.HubConnectionState.Disconnected) {
    try {
      await connection.start();
      console.log("✅ SignalR Connected");
    } catch (err) {
      console.error("❌ SignalR Connection Failed:", err);
    }
  } else {
    console.warn(
      "⚠️ SignalR is not in 'Disconnected' state:",
      connection.state
    );
  }
};

export const stopSignalRConnection = async () => {
  if (connection && connection.state === signalR.HubConnectionState.Connected) {
    await connection.stop();
    console.log("🛑 SignalR Disconnected");
  }
};
