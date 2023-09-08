const http = require('http')
exports.listen = (html, port) => {
  const server = http.createServer(
    function (request, response) {
      response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
      })
      response.end(html)
    }
  )

  console.log(
    `ready started server. url: http://localhost:${port}/`
  )

  server.listen(port)
}
