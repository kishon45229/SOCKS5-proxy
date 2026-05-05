export function handleHandshake(data, client) {
  const methods = data.slice(2, 2 + data[1]);

  // require username/password auth (0x02)
  if (!methods.includes(0x02)) {
    client.write(Buffer.from([0x05, 0xff]));
    client.destroy();
    return false;
  }

  client.write(Buffer.from([0x05, 0x02]));
  return true;
}
