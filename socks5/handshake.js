export function handleHandshake(data, socket) {
  const methods = data.slice(2, 2 + data[1]);

  // require username/password auth (0x02)
  if (!methods.includes(0x02)) {
    socket.write(Buffer.from([0x05, 0xff]));
    socket.destroy();
    return false;
  }

  socket.write(Buffer.from([0x05, 0x02]));
  return true;
}
