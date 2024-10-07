import mongoose from "mongoose";

export async function connectToDB() {
  const mongo_uri = process.env.MONGO_URI;
  if (!mongo_uri) throw new Error("mongo_uri not found");
  try {
    await mongoose.connect(mongo_uri);
    const connection = mongoose.connection;
    connection.on("connect", () => console.log("Connected to DB"));
    connection.on("error", (error) => {
      console.log("Failed to connect to DB", error);
      process.exit(1);
    });
  } catch (error) {
    console.log("Something went wrong!", error);
  }
}
