const http = require('http');

const PORT = 3000;

const friends = [
  {
    id: 0,
    name: 'Neo'
  },
  {
    id: 1,
    name: 'Trinity'
  }
]

const server = http.createServer((req, res) => {
  const items = req.url.split('/')
  if (items[1] === 'friends') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    if (items.length === 3) {
      const friendIndex = Number(items[2])
      res.end(JSON.stringify(friends[friendIndex]))
    }
    res.end(
      JSON.stringify(friends)
    );
  } else if (items[1] === 'messages') {
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<body>')
    res.write('<ul>')
    res.write('<li>Hello</li>')
    res.write('<ul>')
    res.write('<body>')
    res.write('<html>')
    res.end()
  } else {
    res.statusCode = 404;
    res.end()
  }
});

server.listen(PORT, console.log(`server running on ${PORT}`));
