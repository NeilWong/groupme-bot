let constants = require("./constants.js");
let apis = require("./apis/messages");

/**
 * Request handler function that parses request and posts message depending on parsed request text
 */
function respond() {
  // let request = JSON.parse(this.req.chunks[0])
  let request = JSON.parse(this.req.chunks);
  let name = request.name;
  let command = request.text;
  let commands = constants.VALID_MESSAGES;

  console.log(request);

  console.log(name, command, commands);
  //console.log(request.name && isValidCommand(command, commands));
  if (request.name !== "DSP-Bot" && isValidCommand(command, commands)) {
    this.res.writeHead(200);
    apis.postMessage(command, name);
    this.res.end();
  } else {
    console.log("ignore message");
    this.res.writeHead(200);
    this.res.end();
  }
}

/**
 * Checks if a request message is valid by checking if it is in a specified list of valid commands
 * @param {String} message
 * @returns {bool}
 */
const isValidCommand = (command, commands) => {
  return commands.includes(command);
};

// Start Helper Functions //

// addInUser(user name)

exports.respond = respond;
