// Node.js
var admin = require("firebase-admin");
var serviceAccount = require("./workegypt-6ee8f-firebase-adminsdk-0qzhv-51886110f6.json");

require("dotenv").config();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// ownerId - who owns the picture someone liked
// userId - id of the user who liked the picture
// picture - metadata about the picture

// Get the users details
// This registration token comes from the client FCM SDKs.
var registrationToken =
    "dMV7cey3TxSZp8mweh4c_P:APA91bGqBqEh_tQJI43ICMs--1K5794MIdUpYetrwEuMneg8JlObT5-bl1RiGWKHEwZPtDH2zGoAabDRB_LSva1vjkOmQ-4kwRjYQeJKydVL_j8skjy261hjbC0-I65DL0GWU8_joi_R";
var message = {
    data: {
        score: "850",
        time: "2:45",
    },
    token: registrationToken,
};
const registrationTokens = [registrationToken];

const messages = {
    data: { score: "850", time: "2:45" },
    tokens: registrationTokens,
};
var options = {
    priority: "high",
    timeToLive: 60 * 60 * 24,
};
var payload = {
    notification: {
        title: "Urgent action needed!",
        body:
            "Urgent action is needed to prevent your account from being disabled!",
    },
};
// Send a message to the device corresponding to the provided
// registration token with the provided options.
admin
    .messaging()
    .sendToDevice(registrationToken, payload, options)
    .then(function (response) {
        console.log("Successfully sent message:", response);
    })
    .catch(function (error) {
        console.log("Error sending message:", error);
    });
// Send a message to the device corresponding to the provided
// registration token.
// admin
//     .messaging()
//     .sendMulticast(messages)
//     .then((response) => {
//         // Response is a message ID string.
//         console.log("Successfully sent message:", response);
//     })
//     .catch((error) => {
//         console.log("Error sending message:", error);
//     });

// admin
//     .messaging()
//     .send(message)
//     .then((response) => {
//         // Response is a message ID string.
//         console.log("Successfully sent message:", response);
//     })
//     .catch((error) => {
//         console.log("Error sending message:", error);
//     });
/*
(async () => {
    console.log("START");
    await admin.messaging().sendToDevice(
        [
            "eUUA9dP5TxKzE-whFGS89C:APA91bHpGtBRkr347OG4vtfDMBgp4yR5Z387cPlSpLANGWIZSbPxXws3G6NxkMCbnAdj4ajSZHaWaWsGDjFzgOeWhdmBrdlgq1ZKKvdbOg5kYDRB9rtt6HHLfwZkiddUMd-zF5dSscM7",
        ],
        {
            data: {
                score: "850",
                time: "2:45",
            },
        },
        {
            // Required for background/quit data-only messages on iOS
            contentAvailable: true,
            // Required for background/quit data-only messages on Android
            priority: "high",
        }
    );
    console.log("END");
})();
*/
