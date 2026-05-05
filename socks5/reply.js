export function handleSuccess(client) {
  client.write(Buffer.from([0x05, 0x00, 0x00, 0x01, 0, 0, 0, 0, 0, 0]));
}

export function handleFailure(client) {
  client.write(Buffer.from([0x05, 0x01]));
  client.destroy();
}

export function handleAuthResult(client, ok) {
  client.write(Buffer.from([0x01, ok ? 0x00 : 0x01]));
}
