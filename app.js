const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(console.error);

app.use(express.json());

const routes = require("./routes");
app.use((req, res, next) => {
  req.user = {
    _id: "6880d91d19e5b03352a9fe6a",
  };
  next();
});
app.use("/", indexRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
