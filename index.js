var http, director, cool, bot, router, server, port;

http = require("http");
director = require("director");
cool = require("cool-ascii-faces");
bot = require("./bot.js");

// const queryString = require("querystring");

port = Number(process.env.PORT || 5000);
router = new director.http.Router({
  "/": {
    post: bot.respond,
    get: ping
  }
});

server = http.createServer(function (req, res) {
  req.chunks = [];
  req.on("data", function (chunk) {
    req.chunks.push(chunk.toString());
  });
  req.on('error', (error) => {
    console.log(error);
  })

  router.dispatch(req, res, function (err) {
    res.writeHead(err.status, { "Content-Type": "text/plain" });
    res.end(err.message);
  });
});

server.listen(port);
console.log("app running on https://127.0.0.1:5000/");

// Start Testing //

let postObject = { text: "/in" }
const postData = JSON.stringify(postObject)

const options = {
  hostname: "127.0.0.1",
  port: 5000,
  path: "/",
  method: "POST"
};


const req = http.request(options, res => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding("utf8");
  res.on("data", chunk => {
    console.log(`BODY: ${chunk}`);
  });
  res.on("end", () => {
    console.log("No more data in response.");
  });
});

req.on("error", e => {
  console.error(`problem with request: ${e.message}`);
});

req.write(postData);
req.end();

// End testing //

function ping() {
  this.res.writeHead(200);
  this.res.end("Hey, I'm DSP Bot!");
}
