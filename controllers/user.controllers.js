const UserModel = require("../models/user.model");
const UserDTO = require("../DTO/user.dto");

const list_user = async (req, res) => {
  try {
    let users = await UserModel.find({});
    return res.json({ errorCode: 0, data: users });
  } catch (error) {
    return res.json({ errorCode: 500, errorMsg: "System error" });
  }
};

const get_user = async (req, res) => {
  try {
    let { id } = req.params;
    let findUser = await UserModel.findOne({ id });
    if (!findUser) {
      return res.json({ errorCode: 400, errorMsg: "Not Found User" });
    }
    return res.json({ errorCode: 0, data: findUser });
  } catch (error) {
    return res.json({ errorCode: 500, errorMsg: "System error" });
  }
};

const create_user = async (req, res) => {
  try {
    let { username, name, age } = req.body;
    if (!username || !name) {
      return res.json({ errorCode: 1, errorMsg: "Invalid params" });
    }
    let userId = generateRandomNumberString(10);
    let findUser = await UserModel.find({ id: userId });
    if (findUser.length) {
      return res.json({ errorCode: 400, errorMsg: "Has exists" });
    }
    const userDTO = new UserDTO(userId, username, name, age);
    const newUser = await UserModel.create({
      id: userId,
      username: userDTO.username,
      name: userDTO.name,
      age: userDTO.age,
    });
    return res.json({ errorCode: 0, data: newUser });
  } catch (error) {
    return res.json({ errorCode: 500, errorMsg: "System error" });
  }
};

const update_user = async (req, res) => {
  try {
    let { id } = req.params;
    let { username, name, age } = req.body;
    if (username === "" || name === "") {
      return res.json({ errorCode: 1, errorMsg: "Invalid params" });
    }
    const userDTO = new UserDTO(id, username, name, age);
    await UserModel.updateOne(
      { id },
      { username: userDTO.username, name: userDTO.name, age: userDTO.age }
    );
    return res.json({ errorCode: 0, errorMsg: "Update succesfully" });
  } catch (error) {
    return res.json({ errorCode: 500, errorMsg: "System error" });
  }
};

const delete_user = async (req, res) => {
  try {
    let { id } = req.params;
    await UserModel.deleteOne({ id });
    return res.json({ errorCode: 0, errorMsg: "Delete succesfully" });
  } catch (error) {
    return res.json({ errorCode: 500, errorMsg: "System error" });
  }
};

module.exports = {
  list_user,
  get_user,
  create_user,
  delete_user,
  update_user,
};

function generateRandomNumberString(length) {
  let result = "";
  const characters = "0123456789"; // Các ký tự có thể sử dụng trong chuỗi số

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}
