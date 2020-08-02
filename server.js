const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || '5000';

server.listen(port, () => {
  debug(`Listening on port ${port}.....`);
});
