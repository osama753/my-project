import mongoose from "mongoose"

const connectDB = async ()=>{
    if(mongoose.connections[0].readyState) return;

    await mongoose.connect(process.env.MONGO_URI)
};
export default connectDB;




/*const connectDB = async()=>{
    try{
        if(mongoose.connection.readyState)return;
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected successfully")
    }catch(error){
        console.error("MongoDB connection error:",error);
        throw error;
    }
};
*/