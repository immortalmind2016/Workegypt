const broadCastNotification = (data) => {
    const { io } = require("../index");
    console.log(data);
    io.to(`user-type-${data.to}`).emit(data);
};
const sendSocketNotification = (data) => {
    const { io } = require("../index");
    io.to(data.user).emit("notification", data);
};
module.exports = { broadCastNotification, sendSocketNotification };
