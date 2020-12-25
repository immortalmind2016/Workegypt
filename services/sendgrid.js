const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log();
const messages = {};
const templateIds = {
    verify: {
        en: "d-8b75993bb3274507947437edc7f57a9a",
        ar: "d-8b75993bb3274507947437edc7f57a9a",
    },
};
//ES8
const sendMessage = async (to, code, name) => {
    const msg = {
        to,
        from: "immortal.mind2016@gmail.com", // Use the email address or domain you verified above
        template_id: templateIds.verify.en,
        dynamic_template_data: {
            verification_code: code,
            name,
        },
    };
    return sgMail.send(msg);
};

module.exports = {
    sendMessage,
};
