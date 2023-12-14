//require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import connectDB from "./database.js";

dotenv.config({
  path: "./env",
});

connectDB();
