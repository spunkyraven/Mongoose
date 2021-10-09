console.clear();
// import
const express = require("express");
const connectDB = require("./config/connectDB");
//*********************             ***************************************/

//*********************   Initiate   ***************************************/
//instence app all express methods
const app = express();

//require the env variables

require("dotenv").config();
//connect with data base

connectDB();
//route
// middleware to read the json type
app.use(express.json());
//middleware to the contacts route
app.use("/API", require("./router/PERSON"));
//*********************   Creation server   ***************************************/
// PORT
const PORT = process.env.PORT;
//Create server
app.listen(PORT, () => console.log("server running on PORT", PORT));
