import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
