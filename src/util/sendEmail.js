const sgMail = require('@sendgrid/mail');

exports.sendEmail = async (body) => {
  try {
    const message = {
      from: {
        email: process.env.FROM_EMAIL,
        name: process.env.OWNER_NAME,
      },
      ...body,
    };
    await sgMail.send(message);
  } catch (error) {
    console.error('Error sending test email');
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};
