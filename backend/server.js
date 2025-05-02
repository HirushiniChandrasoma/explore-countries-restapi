require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/auth_route");



// express app
const app = express();

// middleware
app.use(express.json());

// cors
app.use(cors());

//routes
app.use("/auth", authRoute);
// connect to db
var option = { dbName: "mydb" };
mongoose
  .connect(process.env.MONGO_URL, option)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

