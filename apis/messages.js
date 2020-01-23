var HTTPS = require("https");
let botID = process.env.BOT_ID;

const getMessages = () => {
    let options = {
        hostname: "api.groupme.com",
        path: "groups/",
        method: "POST"
    }

    let botReq = HTTPS.request(options, function (res) {
        if (res.statusCode == 202) {
            //neat
        } else {
            console.log("rejecting bad status code " + res.statusCode);
        }
    })


}
/**
 * Posts a message depending on success of request text
 * @param {String} message
 * @param {boolean} success 
 */
const postMessage = (message, success) => {
    let botResponse, options, body, botReq;

    botResponse = createMessage(message, success);

    options = {
        hostname: "api.groupme.com",
        path: "/v3/bots/post",
        method: "POST"
    };

    body = {
        bot_id: botID,
        text: botResponse
    }

    botReq = HTTPS.request(options, function (res) {
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


/* Start Helper Functions */

/**
 * Takes a message and success status and returns a response message based on those fields
 * @param {String} message 
 * @param {boolean} success 
 * @returns {String} 
 */
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


/* End Helper Functions */


/* Start Exports */

exports.postMessage = postMessage;

/* End Exports */