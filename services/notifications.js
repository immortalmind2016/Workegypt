const broadCastNotification = (data) => {
    const { io } = require("../index");
    console.log(data);
    io.to(`user-type-${data.to}`).emit(data);
};
module.exports = { broadCastNotification };
