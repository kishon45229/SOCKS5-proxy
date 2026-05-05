export function logConnection(client, host, port) {
  const timestamp = new Date().toISOString(); 
  console.log(
    `[${timestamp}] Connection from ${client.remoteAddress}:${client.remotePort} to ${host}:${port}`,
  );
}

export function logMessage(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}