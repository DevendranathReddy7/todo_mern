const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  todos: [{ type: mongoose.Types.ObjectId, required: true, ref: "Todo" }],
});

module.exports = mongoose.model("User", UserSchema);
