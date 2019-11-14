const nodeMailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const Mailer = {
    sendEmail(recipient, emailSubject, emailMessage) {
        let transporter = nodeMailer.createTransport({
            host: process.env.MAIL_SMTP_HOST,
            port: process.env.MAIL_SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.MAIL_SMTP_USER,
                pass: process.env.MAIL_SMTP_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let mailOptions = {
            from: `Test Account <${process.env.MAIL_SMTP_USER}>`,
            to: recipient,
            subject: emailSubject,
            html: emailMessage
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return false;
            } else {
                console.log('Message %s sent: %s', info.messageId, info.response);
                return true;
            }
        });
    }
}

module.exports = Mailer;
