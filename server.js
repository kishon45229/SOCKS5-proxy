import net from "net";
import { PORT } from "./config.js";
import { logMessage } from "./logger.js";

const server = net.createServer((socket) => {
  logMessage("Client connected");
  let stage = "handshake";

  socket.on("data", (data) => {
    try {
      if (stage === "handshake") {
        const ok = handleHandshake(data, socket);
        if (ok) stage = "auth";
        return;
      }

      if (stage === "auth") {
        // authentication logic here
      }

      if (stage === "request") {
        // request handling logic here
      }
    } catch (error) {
      console.error("Error:", error.message);
      client.destroy();
    }
  });

  client.on("close", () => {
    logMessage("Client disconnected");
  });
});

server.listen(PORT, () => {
  logMessage(`SOCKS5 running on port ${PORT}`);
});
