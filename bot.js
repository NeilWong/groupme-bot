let constants = require("./constants.js");
let apis = require("./apis/messages")

// Process: receive message (respond) -> verify valid message (checkMessage) -> post correct message in response (postMessage)

/**
 * Request handler function that parses request and posts message depending on parsed request text
 */
function respond() {
  // let request = JSON.parse(this.req.chunks[0])
  // let test = JSON.parse(this.req.chunks)
  // console.log(request);
  // console.log(test)
  // console.log(test.name);
  // console.log(test.user_id);
  let request = JSON.parse(this.req);
  let message = request.text //+ request.name + request.user_id;
  let commands = constants.VALID_MESSAGES;

  // if (request['name'] === "DSP-Bot" && count < 2) {
  //   count += 1;
  //   this.res.writeHead(200);
  //   apis.postMessage("bot name is self", true);
  //   this.res.end();
  // }

  if (request.text && isValidMessage(message, commands)) {
    this.res.writeHead(200);
    apis.postMessage(message, true);
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
