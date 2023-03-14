const express = require('express');
const sgMail = require('@sendgrid/mail');

const router = express.Router();
router.post('/sendMail', async (req, res) => {
  try {
    const message = {
      from: process.env.FROM_EMAIL,
      ...req.body,
    };
    await sgMail.send(message);
    res.status(201).send({ message: 'Successfully Sent Email' });
  } catch (error) {
    if (error.response) {
      console.error(error.response.body);
    }
    res.status(403).json({ error: error.response.body.errors[0].message });
  }
});
module.exports = router;
