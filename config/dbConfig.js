const mongoose = require("mongoose");
//connecting mongodb url
mongoose.connect(process.env.MONGO_URL);
const connection = mongoose.connection;
//if connection is successfull
connection.on("connected", () =>
  console.log("mongodb is successfully connected")
);
//if connection error
connection.on("error", (err) =>
  console.log("error in connecting mongodb :", err)
);

module.exports = mongoose;
