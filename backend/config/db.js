const mongoose= require("mongoose");

const connectDB= async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected");
    } catch (err){
        console.error("DB connected failed;", err.message);
        process.exit(1)
    }
};
module.exports= connectDB;