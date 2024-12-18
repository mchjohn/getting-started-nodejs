const http = require('http')
const { URL } = require('url')

const routes = require('./routes')
const bodyParser = require('./helpers/bodyParser')

const PORT = 3000
const BASE_URL = `https://localhost:${PORT}`

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`${BASE_URL}${request.url}`)

  let { pathname } = parsedUrl;
  let id = null;

  const splitEndpoint = pathname.split('/').filter(Boolean);

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }

  const route = routes.find(({ endpoint, method}) => (
    endpoint === pathname && method === request.method
  ))

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams);
    request.params = { id };

    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'ContentType': 'application/json' })
      response.end(JSON.stringify(body))
    }

    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      bodyParser(request, () => route.handler(request, response));
    } else {
      route.handler(request, response);
    }
  } else {
    response.writeHead(404, { 'ContentType': 'text/html' })
    response.end(`Page ${pathname} not found.`)
  }
})

server.listen(3000, () => console.log('🚀 Server is running!'))