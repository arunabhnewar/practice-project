// External imports
const nodemailer = require("nodemailer");


const sendEmail = async (receiver, emailText, emailSubject) => {

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
        to: receiver,             // list of receivers
        subject: emailSubject,    // Subject line
        html: emailText,           // html body
    };

    return await transporter.sendMail(mailOptions);
};


// Module Export
module.exports = sendEmail;