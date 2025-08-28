import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (username, password) {
  if (!username || !password) {
    throw Error("Fill all fields.");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is to weak.");
  }

  const exists = await this.findOne({ username });
  if (exists) {
    throw Error("Username is taken.");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ username, password: hash });
  return user;
};

userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("Fill all fields.");
  }
  const user = await this.findOne({ username });
  if (!user) {
    throw Error("Username is incorrect");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Wrong password or incorrect username.");
  }
  return user;
};

export default mongoose.model("User", userSchema);
