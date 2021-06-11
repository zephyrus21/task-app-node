const sgMail = require('@sendgrid/mail');

const API_KEY = process.env.EMAIL_API_KEY;

sgMail.setApiKey(API_KEY);

const sendWelcomeMail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'pandey.piyus@gmail.com',
    subject: 'Welcome!!!',
    text: `Hello ${name}, how are you?`,
  });
};

const sendCancelMail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'pandey.piyus@gmail.com',
    subject: `Hello ${name}`,
    text: `How are you?
    Any reason for the cancelation of subscription?`,
  });
};

module.exports = {
  sendWelcomeMail,
  sendCancelMail,
};
