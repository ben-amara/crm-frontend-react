"use strict";
const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
function setUpMailer() {
    this.config = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'golden.parker95@ethereal.email',
            pass: 'CzFwrb5GSpUSpJ9JsV'
        }
    });
}


const sendMail = async (email, pin) => {
    return new Promise(async (resolve, reject) => {
        try {
            const transport = new setUpMailer()
            const info = await transport.config.sendMail({
                from: '"CRM 👻" golden.parker95@ethereal.email',
                to: email, // list of receivers
                subject: "Reset password with pin code ✔",
                text: `Here is your password rest pin ${pin}
                this pin will be expires in 1day`,
                html: `<b> Hello </b>
                Here is your pin 
                <b>${pin}</b> This pin will expires in 1day`
            });
            resolve(info)
        } catch (error) {
            reject(error)
        }

    })
}

module.exports = {
    sendMail

}

