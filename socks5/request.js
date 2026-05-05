export function handleRequest(data) {
  let offset = 4;

  const cmd = data[1];
  const atyp = data[3];

  let host;

  if (atyp === 0x01) {
    host = data.slice(offset, offset + 4).join(".");
    offset += 4;
  } else if (atyp === 0x03) {
    const len = data[offset++];
    host = data.slice(offset, offset + len).toString();
    offset += len;
  } else {
    throw new Error("Unsupported address type");
  }

  const port = data.readUInt16BE(offset);

  return { cmd, host, port };
}
