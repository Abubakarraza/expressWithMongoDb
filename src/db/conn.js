const mongoose = require('mongoose');
const DB = process.env.DATABASE;
mongoose
  .connect(DB)
  .then(() => {
    console.log('MongoDb successfully 😜 🤪 connected .... ');
  })
  .catch((error) => {
    console.log('MongoDb is not working 😱 Error:', error);
  });
