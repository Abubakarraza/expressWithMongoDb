const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });
const sgMail = require('@sendgrid/mail');
const cookieParser = require('cookie-parser');
const blogRoutes = require('./router/blog/blogRoutes');
const userRoutes = require('./router/auth/authRoutes');
const sendEamil = require('./router/sendMail/sendMail');
const { collections } = require('./db/db');

const app = express();
require('./db/conn');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const port = process.env.PORT || 3000;
global.db = collections;
app.use(express.json());
app.use(cookieParser());
app.use(blogRoutes);
app.use(userRoutes);
app.use(sendEamil);
app.get('/', (req, res) => {
  res.send('Hello this is Express.js Server');
});
app.listen(port, () => {
  console.log(`Server is runing at 👉 http://localhost:${port}`);
});
