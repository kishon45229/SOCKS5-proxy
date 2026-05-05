# SOCKS5 Proxy (Node.js)

A small SOCKS5 proxy server implemented with Node’s `net` module.

## Requirements

- Node.js

## Configure

Edit `config.js`:

- `PORT` (default `3000`)
- `USER.username` / `USER.password`

## Run

From the project root:

```bash
node server.js
```

You should see a log like:

```
SOCKS5 running on port 3000
```

## Test

### cURL

```bash
curl --socks5-hostname <username>:<password>@127.0.0.1:3000 https://example.com
```

### Browser / App

Configure your client to use a SOCKS5 proxy:

- Host: `127.0.0.1`
- Port: `3000`
- Username: `admin`
- Password: `123456`

## License MIT

Please see [LICENSE](LICENSE) for details.

## Acknowledgments

- [SOCKS5 Protocol](https://www.proxies.sx/resources/protocols/socks5)
- [Node.js net module](https://nodejs.org/api/net.html)
