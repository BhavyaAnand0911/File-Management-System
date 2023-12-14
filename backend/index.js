//require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import connectDB from "./database.js";
import app from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server Running at : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error in connecting the database", error);
  });
