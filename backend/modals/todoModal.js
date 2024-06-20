const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const getDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return `${day}-${month}-${year}`;
};
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
  date: {
    type: Date,
    default: getDate(),
  },
  owner: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Todo", TodoSchema);
