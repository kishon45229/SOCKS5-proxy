import { net } from "net";
import { logConnection } from "../logger";
import { handleFailure } from "../socks5/reply";

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
