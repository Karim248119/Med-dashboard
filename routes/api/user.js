const express = require("express");
const controller = require("../../apis/user");
const router = express.Router();

const base = "/users";

//getAll
router.get(base, controller.getAllUsers);

//add
router.post(`${base}/add`, controller.addUser);

//update
router.put(`${base}/:id`, controller.updateUser);

//delete
router.delete(`${base}/:id`, controller.deleteUser);

module.exports = router;
