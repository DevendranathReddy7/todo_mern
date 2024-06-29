const mongoose = require("mongoose");
const { format } = require("date-fns");
const { enUS } = require("date-fns/locale");

const Schema = mongoose.Schema;

const getDate = () => {
  const today = new Date();
  const formattedDate = format(today, "dd-MMM-yyyy", { locale: enUS });
  return formattedDate;
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
