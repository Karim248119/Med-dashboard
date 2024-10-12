const userModel = require("../models/user.js");
const genericMethod = require("../models/generic.js");

const userMethods = new genericMethod(userModel);

//getAll

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 100, name } = req.query;
    let filters = {};
    if (name) {
      filters.name = { $regex: name, $options: "i" };
    }
    const users = await userMethods.getAll(
      filters,
      {},
      parseInt(page),
      parseInt(limit)
    );
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

//add

const addUser = async (req, res) => {
  try {
    const data = req.body;
    console.log("req:", req.body);

    const user = await userMethods.create(data);
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

//update
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const user = await userMethods.update(id, data);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

//delete
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userMethods.delete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
module.exports = {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
};
