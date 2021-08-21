import Mongoose from 'mongoose';

const DB_URL = process.env.DB_URL;

export function connect() {
  return Mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Successfully connected to database');
    })
    .catch((err) => {
      console.error('Unable to connect to database:', err);
      process.exit(1);
    });
}
