import net from "net";
import { logConnection } from "../logger.js";
import { handleSuccess, handleFailure } from "../socks5/reply.js";

export function createTunnel(client, host, port) {
  const remote = net.createConnection(port, host);

  client.pipe(remote);
  remote.pipe(client);

  remote.once("connect", () => {
    logConnection(client, host, port);
    handleSuccess(client);
  });

  remote.on("error", () => {
    handleFailure(client);
    remote.destroy();
  });

  client.on("error", () => {
    remote.destroy();
  });

  return remote;
}
