const express = require("express");
const bodyParser = require("body-parser");
const authRouters = require("./routes/authenticationRoutes.js");
const app = express();
app.use(bodyParser.json());
const mongoose = require("mongoose");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*"); //Origin,X-Requested-With,Content-Type,Accept,Authorization
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");

  next();
});

app.use("/", authRouters);

mongoose
  .connect(
    "mongodb+srv://devendrareddy7733:MD6WJ6w40cLTS5EL@todo.89rxztz.mongodb.net/todo?retryWrites=true&w=majority&appName=Todo"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
