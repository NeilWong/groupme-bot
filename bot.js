var HTTPS = require("https");
var cool = require("cool-ascii-faces");
let constants = require("./constants.js");
let apis = require("./apis/messages")

var botID = process.env.BOT_ID;

// Process: receive message (respond) -> verify valid message (checkMessage) -> post correct message in response (postMessage)

// Test Local Storage
let user = { name: "", status: "in" }

let inUsers = 0;
let currentUsers = []

// End Local Storage //

/**
 * Request handler function that parses request and posts message depending on parsed request text
 */
function respond() {
  console.log(this.req);
  let request = JSON.parse(this.req.chunks[0])
  let message = request.text;
  let commands = constants.VALID_MESSAGES;

  if (request.text && isValidMessage(message, commands)) {
    this.res.writeHead(200);
    apis.postMessage(message, true);
    this.res.end();
  } else {
    console.log('ignore message')
    this.res.writeHead(200);
    //postMessage(message, false)
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
