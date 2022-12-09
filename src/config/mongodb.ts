import "dotenv/config";
import { connect } from "mongoose";

async function dbConnect(): Promise<void> {
  const DB_URI = <string>process.env.DB_URI;
  await connect("mongodb+srv://M4rv:a1b2c3rt@movies-ts.kvaphd1.mongodb.net/?retryWrites=true&w=majority");
}

export default dbConnect;