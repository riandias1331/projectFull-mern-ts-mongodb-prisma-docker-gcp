import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("✅ DataBase is connected");
  } catch (error) {
    console.error("❌ Error connecting to database:", error);
    process.exit(1); // Opcional: encerra a app se falhar
  }
};

