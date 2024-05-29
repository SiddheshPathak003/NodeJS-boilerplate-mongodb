const createError = require("http-errors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const router = require("./src/routes/auth");

dotenv.config();
const app = express();
let PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("DB connection successful");
  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", router);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "production" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
