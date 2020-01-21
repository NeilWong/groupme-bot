var HTTPS = require("https");
var cool = require("cool-ascii-faces");
let constants = require("./constants.js");

var botID = process.env.BOT_ID;

// Process: receive message (respond) -> verify valid message (checkMessage) -> post correct message in response (postMessage)

/**
 * Request handler function that parses request and posts message depending on parsed request text
 */
function respond() {
  // var request = JSON.parse(this.req.chunks[0]),
  //   botRegex = /^\/cool guy$/;
  let request = JSON.parse(this.req.chunks[0])

  if (request.text && isValidMessage(request.text)) {
    this.res.writeHead(200);
    postMessage(true);
    this.res.end();
  } else {
    this.res.writeHead(200);
    postMessage(false)
    this.res.end();
  }
}

/**
 * Checks if a request message is valid by checking if it is in list of valid commands
 * @param {String} message 
 * @returns {bool} 
 */
const isValidMessage = (message) => {
  return constants.VALID_MESSAGES.includes(message);
}

/**
 * Posts a message depending on success of request text
 * @param {boolean} success 
 */
function postMessage(success) {
  //var botResponse, options, body, botReq;

  // if success === false -> post error message
  console.log(success);

  // botResponse will be determined by helper function parsing input and making relevant data accezs requests (user count, user name/login, etc)
  let botResponse = cool();

  let options = {
    hostname: "api.groupme.com",
    path: "/v3/bots/post",
    method: "POST"
  };

  let body = {
    bot_id: botID,
    text: botResponse
  };

  console.log("sending " + botResponse + " to " + botID);

  let botReq = HTTPS.request(options, function (res) {
    if (res.statusCode == 202) {
      //neat
    } else {
      console.log("rejecting bad status code " + res.statusCode);
    }
  });

  botReq.on("error", function (err) {
    console.log("error posting message " + JSON.stringify(err));
  });
  botReq.on("timeout", function (err) {
    console.log("timeout posting message " + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

exports.respond = respond;
