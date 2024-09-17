import mongoose from "mongoose";

// const mongoURI = 'mongodb://127.0.0.1:27017/interstellar';

// console.log("db : ", process.env.DATABASE_URL);
// const mongoURI = process.env.DATABASE_URL ?? '';

const connectDB = (url: any) => {
    mongoose.connect(url);
}

export default connectDB