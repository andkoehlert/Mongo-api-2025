import mongoose from 'mongoose';


export async function testConnection() {
  try {
    await connect();
    await disconnect();
    console.log("Connection test successful");
  }
  catch (error) {
    console.error("Error testing connection", error);
  }
}


export async function connect() {
  try {

    if (!process.env.DBHOST) {
      throw new Error("DBHOST is not defined");
    }
    await mongoose.connect(process.env.DBHOST);
  
  if (mongoose.connection.db) {
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Connected to database");
  }
  else {
    throw new Error("Error connecting to database");
  }

  }
  catch (error) {
    console.error("Error connecting to database", error);
  }
  }



  export async function disconnect() {
    try {
await mongoose.disconnect();
    }
    catch (error) {
      console.error("Error disconnecting from database", error);
  }
  }
