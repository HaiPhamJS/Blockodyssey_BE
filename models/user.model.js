const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: String, unique: true, require: true },
  username: { type: String, require: true },
  name: { type: String, require: true },
  age: { type: Number },
});

module.exports = mongoose.model("User", userSchema);
