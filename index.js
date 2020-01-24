var http, director, bot, router, server, port;

http = require("http");
https = require("https");
director = require("director");
cool = require("cool-ascii-faces");
bot = require("./bot.js");

port = Number(process.env.PORT || 5000);

//routing table
router = new director.http.Router({
  // makes it so that post requests are handled by bot.respond
  // get requests handled by ping function
  "/": {
    post: bot.respond,
    get: ping
  }
});

server = http.createServer(function(req, res) {
  req.chunks = [];
  req.on("data", function(chunk) {
    req.chunks.push(chunk.toString());
  });

  // general dispatch that handled any requests sent to router
  router.dispatch(req, res, function(err) {
    res.writeHead(err.status, { "Content-Type": "text/plain" });
    res.end(err.message);
  });
});

server.listen(port);
console.log("app running on https://127.0.0.1:5000/");

function ping() {
  this.res.writeHead(200);
  this.res.end("Hey, I'm DSP Bot!");
}

// Start Testing //
// /* COMMENT OUT WHEN PUSHING CODE*/

let postObject = {
  attachments: [],
  avatar_url: "https://i.groupme.com/123456789",
  created_at: 1302623328,
  group_id: "1234567890",
  id: "1234567890",
  name: "John",
  sender_id: "12345",
  sender_type: "user",
  source_guid: "GUID",
  system: false,
  text: "/in",
  user_id: "1234567890"
};

const postData = JSON.stringify(postObject);

const options = {
  hostname: "127.0.0.1",
  port: 5000,
  path: "/",
  method: "POST"
};

// const options = {
//   hostname: "https://gm-bot-dsp.herokuapp.com",
//   path: "/",
//   method: "POST"
// }

const req = http.request(options, res => {
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

// // End testing //
