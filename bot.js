var HTTPS = require("https");
var cool = require("cool-ascii-faces");
let constants = require("./constants.js");
let apis = require("./apis/messages")

var botID = process.env.BOT_ID;

// Process: receive message (respond) -> verify valid message (checkMessage) -> post correct message in response (postMessage)

/**
 * Request handler function that parses request and posts message depending on parsed request text
 */
var count = 0
function respond() {
  console.log(typeof this.req)
  let request = JSON.parse(this.req.chunks[0])
  let message = request.text;
  let fullMessage = JSON.parse(this.req.chunks).text;
  let commands = constants.VALID_MESSAGES;

  // if (request['name'] === "DSP-Bot" && count < 2) {
  //   count += 1;
  //   this.res.writeHead(200);
  //   apis.postMessage("bot name is self", true);
  //   this.res.end();
  // }

  if (request.text && isValidMessage(message, commands)) {
    this.res.writeHead(200);
    apis.postMessage(fullMessage, message, true);
    this.res.end();
  } else {
    console.log('ignore message')
    this.res.writeHead(200);
    this.res.end();
  }
}

/**
 * Checks if a request message is valid by checking if it is in a specified list of valid commands
 * @param {String} message 
 * @returns {bool} 
 */
const isValidMessage = (message, commands) => {
  return commands.includes(message);
}

// Start Helper Functions //

// addInUser(user name)

exports.respond = respond;
