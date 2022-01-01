const http = require("http");
const url = require("url");
const fs = require("fs");

//npm i mime-types
const lookup = require("mime-types").lookup;

const server = http.createServer((req, res) => {
  //handle the request and send back a static file
  //from a folder called `public`
  let parsedURL = url.parse(req.url, true);
  //remove the leading and trailing slashes
  let path = parsedURL.path.replace(/^\/+|\/+$/g, "");
  /**
   *  /
   *  /index.html
   *
   *  /main.css
   *  /main.js
   */
  if (path == "") {
    path = "index.html";
  }
  console.log(`Requested path ${path} `);

  let file = __dirname + "/public/" + path;
  //async read file function uses callback
  fs.readFile(file, function(err, content) {
    if (err) {
      console.log(`File Not Found ${file}`);
      res.writeHead(404);
      res.end();
    } else {
      //specify the content type in the response
      console.log(`Returning ${path}`);
      res.setHeader("X-Content-Type-Options", "nosniff");
      let mime = lookup(path);
      res.writeHead(200, { "Content-type": mime });
      // switch (path) {
      //   case "main.css":
      //     res.writeHead(200, { "Content-type": "text/css" });
      //     break;
      //   case "main.js":
      //     res.writeHead(200, { "Content-type": "application/javascript" });
      //     break;
      //   case "index.html":
      //     res.writeHead(200, { "Content-type": "text/html" });
      // }
      res.end(content);
    }
  });
});

var SerialPort = require('serialport');
const parsers = SerialPort.parsers;

const parser = new parsers.Readline({
  delimiter: '\r\n'
});

var port = new SerialPort('COM4',{
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
});

port.pipe(parser);

var io = require('socket.io').listen(server);

io.on('connection', function(socket) {
  console.log('Node is listening to port');
});

parser.on('data', function(data) {
  console.log('Received data from port: ' + data);
  io.emit('data', data);
});

server.listen(3000, "localhost", () => {
    console.log("Listening on port 3000");
  });