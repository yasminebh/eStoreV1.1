const mongoose = require("mongoose");

const db = "mongodb://127.0.0.1:27017/dbestoreYasmine";

const connectToDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("successfuly connected");
  } catch (error) {
    console.log("error to connect" + error);
  }
};
module.exports = connectToDB;
