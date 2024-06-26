const UserSchema = require("../modals/userModal");
const TodoSchema = require("../modals/todoModal");
const HttpError = require("../modals/http-error");

const getTodos = async (req, res, next) => {
  const owner = req.params.uId;
  let validUser = "";
  let todos = "";
  try {
    validUser = await UserSchema.findOne({ _id: owner });
  } catch (err) {
    // const error = new HttpError("Something went wrong", 500);
    // return next(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }

  try {
    if (validUser) {
      todos = await TodoSchema.find({ owner: owner });
    } else {
      return res
        .status(401)
        .json({ message: "You're not authorised to perform this action" });
    }
  } catch (err) {
    // const error = new HttpError("Something went wrong get", 500);
    // return next(error);

    return res.status(500).json({ message: "Something went wrong!" });
  }
  res.json({
    todos: todos.map((todo) => todo.toObject({ getters: true })),
  });
};

const addTodo = async (req, res, next) => {
  const { title, description, priority, status, date, owner } = req.body;
  let validUser = "";
  try {
    validUser = await UserSchema.findOne({ _id: owner });
  } catch (err) {
    // const error = new HttpError("Something went wrong", 500);
    // return next(error);

    return res.status(500).json({ message: "Something went wrong!" });
  }

  try {
    if (validUser) {
      const todo = TodoSchema({
        title,
        description,
        priority,
        status,
        date,
        owner,
      });

      await todo.save();
      await UserSchema.findByIdAndUpdate(owner, {
        $push: { todos: todo._id },
      });
      res.status(201).json(todo);
    } else {
      return res
        .status(401)
        .json({ message: "You're not authorised to perform this action" });
    }
  } catch (error) {
    res.send(error);
  }
};

const editTodo = async (req, res, next) => {
  const { title, description, priority, status, date, owner } = req.body;

  const todoId = req.params.todoId;

  let validUser = "";
  let editingTodo = "";
  try {
    validUser = await UserSchema.findOne({ _id: owner });
    editingTodo = await TodoSchema.findOne({ _id: todoId });
  } catch (err) {
    // const error = new HttpError("Something went wrong", 500);
    // return next(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }

  try {
    if (validUser) {
      if (editingTodo) {
        const updatedTodo = await TodoSchema.findByIdAndUpdate(
          editingTodo._id,
          {
            title,
            description,
            priority,
            status,
            date,
            owner,
          },
          { new: true, runValidators: true }
        );

        if (updatedTodo) {
          res.status(200).json({ message: "Updated the todo" });
        } else {
          res.status(400).json({ message: "Error while updating your todo" });
        }
      } else {
        res.status(400).json({ message: "Error: Todo not found" });
      }
    } else {
      res
        .status(401)
        .json({ message: "You're not authorised to perform this action" });
    }
  } catch (err) {
    res.send({ message: err });
  }
};

const deleteTodo = async (req, res, next) => {
  const { id, owner } = req.body;

  let validUser = "";
  let editingTodo = "";
  try {
    validUser = await UserSchema.findOne({ _id: owner });
    editingTodo = await TodoSchema.findOne({ owner: owner });
  } catch (err) {
    // const error = new HttpError("Something went wrong", 500);
    // return next(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }

  try {
    if (validUser) {
      if (editingTodo) {
        const updatedTodo = await TodoSchema.findByIdAndDelete({ _id: id });

        if (updatedTodo) {
          await UserSchema.findByIdAndUpdate(
            owner,
            {
              $pull: { todos: updatedTodo._id },
            },
            { new: true }
          );
          res.status(200).json({ message: "Successfully deleted todo" });
        } else {
          res.status(400).json({ message: "Error while deleting your todo" });
        }
      } else {
        res.status(400).json({ message: "Error: Todo not found" });
      }
    } else {
      res
        .status(401)
        .json({ message: "You're not authorised to perform this action" });
    }
  } catch (err) {
    res.send(err);
  }
};

exports.getTodos = getTodos;
exports.addTodo = addTodo;
exports.editTodo = editTodo;
exports.deleteTodo = deleteTodo;
