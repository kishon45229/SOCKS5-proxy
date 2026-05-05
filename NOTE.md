In this project, I built a minimal SOCKS5 proxy server using Node.js. The goal was to support client connections, perform username and password authentication, and tunnel TCP traffic to a requested destination.

I structured the project with separation of concerns in mind. The server entry point file `server.js` handles incoming TCP connections, while individual modules are responsible for authentication, SOCKS5 protocol parsing, tunneling, and logging. This makes the code easier to maintain and extend.

During development, one challenge I encountered was `failed to receive handshake, SSL/TLS connection failed` error. This was due to the fact that the client was trying to establish an SSL/TLS connection to the proxy, which is not supported. To resolve this, I ensured that the client was configured to use a SOCKS5 proxy without SSL/TLS.

If I had more time, I would improve the implementation by adding proper buffering for partial TCP packets, IPv6 support, structured logging, and possibly support for additional SOCKS5 commands like UDP associate.