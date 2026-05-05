import net from "net";
import { PORT } from "./config.js";
import { logMessage } from "./logger.js";
import { handleHandshake } from "./socks5/handshake.js";
import { handleAuth } from "./auth.js";
import { handleRequest } from "./socks5/request.js";
import {
  handleSuccess,
  handleFailure,
  handleAuthResult,
} from "./socks5/reply.js";
import { createTunnel } from "./proxy/tunnel.js";

const server = net.createServer((client) => {
  logMessage("Client connected");
  let stage = "handshake";

  client.on("data", (data) => {
    try {
      if (stage === "handshake") {
        const ok = handleHandshake(data, client);
        if (ok) stage = "auth";
        return;
      }

      if (stage === "auth") {
        const ulen = data[1];
        const user = data.slice(2, 2 + ulen).toString();

        const plen = data[2 + ulen];
        const pass = data.slice(3 + ulen, 3 + ulen + plen).toString();

        const ok = handleAuth(user, pass);

        handleAuthResult(client, ok);

        if (!ok) return handleFailure(client);

        stage = "request";
        return;
      }

      if (stage === "request") {
        const { cmd, host, port } = handleRequest(data);

        if (cmd !== 0x01) return handleFailure(client);

        logMessage(`Request to connect to ${host}:${port}`);

        handleSuccess(client);

        createTunnel(client, host, port);
      }
    } catch (error) {
      logMessage(`Error: ${error.message}`);
      handleFailure(client);
    }
  });

  client.on("close", () => {
    logMessage("Client disconnected");
  });
});

server.listen(PORT, () => {
  logMessage(`SOCKS5 running on port ${PORT}`);
});
