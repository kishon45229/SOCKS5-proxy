import net from "net";

const server = net.createServer((socket) => {
  console.log("Client connected");
  let stage = "handshake";

  socket.on("data", (data) => {
    try {
      if (stage === "handshake") {
        // handshake logic here
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
    log("Client disconnected");
  });
});

server.listen(process.env.PORT, () => {
  log(`SOCKS5 running on port ${process.env.PORT}`);
});
