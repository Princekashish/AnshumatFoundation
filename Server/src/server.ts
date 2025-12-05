import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connnectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}`
    );
    console.log(
      `DB is connnected !! DB HOST: ${connnectionInstance.connection.host} `
    );
  } catch (error) {
    console.log(error);
  }
};

export default connectDB
