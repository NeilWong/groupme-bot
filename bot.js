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
  let message = request.text;

  if (request.text && isValidMessage(message)) {
    this.res.writeHead(200);
    postMessage(message, true);
    this.res.end();
  } else {
    this.res.writeHead(200);
    postMessage(message, false)
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
 * @param {String} message
 * @param {boolean} success 
 */
function postMessage(message, success) {
  //var botResponse, options, body, botReq;

  // if success === false -> post error message
  console.log(success);

  // botResponse will be determined by helper function parsing input and making relevant data accezs requests (user count, user name/login, etc)
  let botResponse = createMessage(message, success);

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


const createMessage = (message, success) => {
  let botResponse;

  if (success === false) {
    return "invalid message";
  }

  switch (message) {
    case "/cool guy":
      botResponse = "valid cool guy"
      break;
    case "/in":
      botResponse = "valid in"
      break;
    case "/out":
      botResponse = "valid out"
      break;
    case "/status":
      botResposne = "valid status"
      break;
    case "/users":
      botResponse = "valid users"
      break;
    case "/limit":
      botResponse = "valid limit"
      break;
  }

  return botResponse;
}

exports.respond = respond;
