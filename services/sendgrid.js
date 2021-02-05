const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log();
const messages = {};
const templateIds = {
    verify: {
        en: "d-0278bb702c004aeeb3aab55ea4ecd539",
        ar: "d-0278bb702c004aeeb3aab55ea4ecd539",
    },
    forget: {
        en: " d-7de4d57ac2d04fe1a64f07125e037557",
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
const forgetPasswordSendEmail = async (to, link, name) => {
    const msg = {
        to,
        from: "immortal.mind2016@gmail.com", // Use the email address or domain you verified above
        template_id: templateIds.forget.en,
        dynamic_template_data: {
            link,
            name,
        },
    };
    return sgMail.send(msg);
};

module.exports = {
    sendMessage,
    forgetPasswordSendEmail,
};
