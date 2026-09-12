import mongoose from "mongoose";    

export const connectDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI;
        
        await mongoose.connect(MONGODB_URI, {
            dbName: "API_Astronomia",
        });
        console.log("Conexión con mongoDB exitosa!");
    } catch (error) {
        console.error("Error conectando con mongoDB:", error);
        process.exit(1);
    }
};