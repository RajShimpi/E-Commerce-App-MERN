const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/digitic', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('Database Connected Successfully');
  } catch (error) {
    console.error('Database Connection Error:', error.message);
  }
};

module.exports = dbConnect;
