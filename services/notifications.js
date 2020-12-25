const broadCastNotification = (io, data) => {
    console.log("IO ", io);
    const { type, to, body, title, url, job } = data;
    io.broadcast
        .to(`user-type-${to}`)
        .emit({ type, to, body, title, url, job });
};
module.exports = { broadCastNotification };
