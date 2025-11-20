import mongoose from "mongoose";

const connectDb = async (url)=>{
    try{
       const conn= await mongoose.connect(url);
        console.log(`Mongodb connected: ${conn.connection.name}`);
    }
    catch(error){
        console.error("error Mongo connectivity");
        process.exit(1);
    }
}
export default connectDb;