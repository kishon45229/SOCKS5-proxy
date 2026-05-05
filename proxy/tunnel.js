import net from "net";
import { logConnection } from "../logger.js";
import { handleFailure } from "../socks5/reply.js";

export function createTunnel(client, host, port) {
  const remote = net.createConnection(port, host, () => {
    logConnection(client, host, port);

    client.pipe(remote);
    remote.pipe(client);
  });

  remote.on("error", () => {
    handleFailure(client);
  });

  return remote;
}
