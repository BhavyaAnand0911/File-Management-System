import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("working");
});

app.listen(process.env.PORT, () => {
  console.log("server listening");
});
