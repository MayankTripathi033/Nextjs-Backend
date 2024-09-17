import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("database is already connected");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGO_DB_URI || "", {})
        console.log("database", db);
        connection.isConnected = db.connections[0].readyState
        console.log("Database is connected successfully")
    } catch (error) {
        console.log("Database connection failed", error);
        process.exit(1)
    }
   }
export default dbConnect;
