import app from './app';
import connectDB from "./config/db.config";
// import NodeCache from "node-cache";

import dotenv from 'dotenv'; 
dotenv.config();  

const port = process.env.PORT


// app.listen(port, () => {
//   console.log('Express server listening on port ' + port || 3000)
// })



const startDB = async () => {
  try {
    await connectDB(process.env.DATABASE_URL);
    console.log('Mongodb is connected!!!')
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    })
  } catch (error) {
    console.log(error);
  }
}

console.log("db : ", process.env.DATABASE_URL);


startDB();





