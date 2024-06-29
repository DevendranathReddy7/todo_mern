const express = require("express");
const router = express.Router();
const todoControler = require("../controllers/todoControllers");

router.get("/:uId", todoControler.getTodos);
router.post("/add", todoControler.addTodo);
router.patch("/:todoId/edit", todoControler.editTodo);
router.delete("/delete", todoControler.deleteTodo);

module.exports = router;
