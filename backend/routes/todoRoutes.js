const express = require("express");
const router = express.Router();
const todoControler = require("../controllers/todoControllers");

router.post("/add", todoControler.addTodo);
router.post("/edit", todoControler.editTodo);
router.post("/delete", todoControler.deleteTodo);

module.exports = router;
