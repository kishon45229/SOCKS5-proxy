import net from "net";
import { PORT } from "./config.js";
import { logMessage } from "./logger.js";
import { handleHandshake } from "./handshake.js";
import { handleAuth } from "./auth.js";

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
        const ulen = data[1];
        const user = data.slice(2, 2 + ulen).toString();

        const plen = data[2 + ulen];
        const pass = data.slice(3 + ulen, 3 + ulen + plen).toString();

        const ok = handleAuth(user, pass);
        if (!ok) return client.destroy();

        stage = "request";
        return;
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
