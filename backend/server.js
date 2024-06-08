const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use("/", (req, res, next) => {
  console.log("dev---->");
});
app.listen(3001, console.log("backend server running on 3001"));
