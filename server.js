const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const authRouters = require("./routes/authenticationRoutes.js");
const todoRouters = require("./routes/todoRoutes.js");
const app = express();
app.use(bodyParser.json());
const mongoose = require("mongoose");

app.use(express.static(path.join(__dirname, "frontend", "build")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*"); //Origin,X-Requested-With,Content-Type,Accept,Authorization
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");

  next();
});

app.use("/", authRouters);

app.use("/todo", todoRouters);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

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
