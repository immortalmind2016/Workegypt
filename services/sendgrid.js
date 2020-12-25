const sgMail = require("@sendgrid/mail");
import config from "../config";
sgMail.setApiKey(config.SENDGRID_API_KEY);
console.log();
const messages = {};
const templateIds = {
    verify: {
        en: "d-0a5137f3b9c64748a32b3b4e2c93c2af",
        ar: "d-0a5137f3b9c64748a32b3b4e2c93c2af",
    },
};
//ES8
export const sendMessage = async (to, url, name) => {
    const msg = {
        to,
        from: "immortal.mind2016@gmail.com", // Use the email address or domain you verified above
        template_id: templateIds.verify.en,
        dynamic_template_data: {
            verficiation_code: url,
            name,
        },
    };
    return sgMail.send(msg);
};
