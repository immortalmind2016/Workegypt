// Node.js
var admin = require("firebase-admin");
var serviceAccount = require("../workegypt-6ee8f-firebase-adminsdk-0qzhv-51886110f6.json");

require("dotenv").config();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const sendPushNotificationToUser=(data,token)=>{
    // This registration token comes from the client FCM SDKs.
var registrationToken = 'YOUR_REGISTRATION_TOKEN';

var message = {
  ...data,
  token
};

// Send a message to the device corresponding to the provided
// registration token.
return admin.messaging().send(message)

}
const subscribeToTopic = (token, topic) => {
    var registrationTokens = [token];

    return admin.messaging().subscribeToTopic(registrationTokens, topic);
    /* .then(function (response) {
            // See the MessagingTopicManagementResponse reference documentation
            // for the contents of response.
            console.log("Successfully subscribed to topic:", response);
        })
        .catch(function (error) {
            console.log("Error subscribing to topic:", error);
        });*/
};

// Send a message to devices subscribed to the provided topic.

const sendPushNotification = (data, topic) => {

    var message = {
        ...data,
        topic,
    };

    // Send a message to devices subscribed to the provided topic.
    return admin.messaging().send(message);
    // .then((response) => {
    //     // Response is a message ID string.
    //     console.log("Successfully sent message:", response);
    // })
    // .catch((error) => {
    //     console.log("Error sending message:", error);
    // });
};

module.exports = {
    sendPushNotification,
    subscribeToTopic,
    sendPushNotificationToUser

};
