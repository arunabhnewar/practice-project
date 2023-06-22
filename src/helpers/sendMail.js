// External imports
const nodemailer = require("nodemailer");


const sendEmail = async (mailInfo) => {

    // destructure mailInfo
    const { emailReceivers, emailText, emailSubject } = mailInfo;
    const emailReceiver = emailReceivers.join(", ");

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: `${process.env.EMAIL}`,
        port: 587,
        secure: false, // true for 465, false for other ports
        service: "gmail",
        auth: {
            user: `${process.env.EMAIL}`, // generated ethereal user
            pass: `${process.env.EMAIL_PWD}`, // generated ethereal password
        }, tls: {
            rejectUnauthorized: false
        },
    });

    // option
    const mailOptions = {
        from: process.env.EMAIL,  // sender address
        to: emailReceiver,        // list of receivers
        subject: emailSubject,    // Subject line
        html: emailText,           // html body
    };

    return await transporter.sendMail(mailOptions);
};


// Module Export
module.exports = sendEmail;

