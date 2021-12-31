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
];

// test in developer tools
// fetch('http://localhost:3000/friends', { method: 'POST', body: JSON.stringify({ id: 3, name: 'Ryan Dahl' })}).then(response => response.json()).then(friend => console.log(friend))

const server = http.createServer((req, res) => {
  const items = req.url.split('/');
  if (req.method === 'POST' && items[1] === 'friends') {
    req.on('data', data => {
      const friend = data.toString();
      console.log('Request:', data); // convert to string to print it
      friends.push(JSON.parse(friend)); // convert to object & pass to the array
    });
    req.pipe(res);
  } else if (req.method === 'GET' && items[1] === 'friends') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    if (items.length === 3) {
      const friendIndex = Number(items[2]);
      res.end(JSON.stringify(friends[friendIndex]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (req.method === 'GET' && items[1] === 'messages') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<body>');
    res.write('<ul>');
    res.write('<li>Hello</li>');
    res.write('</ul>');
    res.write('</body>');
    res.write('</html>');
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, console.log(`server running on ${PORT}`));
