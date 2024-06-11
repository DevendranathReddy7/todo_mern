const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true, enum: ["High", "Medium", "Low"] },
  status: {
    type: String,
    required: true,
    enum: ["Todo", "Progress", "Completed"],
    default: "Todo",
  },
  owner: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Todo", TodoSchema);
