import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected',() =>{
            console.log("connection established");
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/spotify`)
       
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
  
}

export default connectDB