export function handleSuccess(socket) {
  socket.write(Buffer.from([0x05, 0x00, 0x00, 0x01, 0, 0, 0, 0, 0, 0]));
}

export function handleFailure(socket) {
  socket.write(Buffer.from([0x05, 0x01]));
  socket.destroy();
}

export function handleAuthResult(socket, ok) {
  socket.write(Buffer.from([0x01, ok ? 0x00 : 0x01]));
}
