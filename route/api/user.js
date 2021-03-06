const express = require("express");
const userController = require("../../controllers/userController");
const { jwtAuth } = require("../../middlewares/jwtAuth");
const { authorize } = require("../../middlewares/authorize");
const router = express.Router();
//---------------
router.post("/updatePassword", userController.updatePassword); //body
router.get("/all", userController.getAllUsers); //lấy toàn bộ thông tin user
router.post(
  "/activeUserByName",
  jwtAuth,
  authorize("admin"),
  userController.activeUserByName
); //body, active user, yêu cầu phải là admin
router
  .route("/:userId")
  .get(userController.getUserById) //lấy thông tin user by id
  .delete(jwtAuth, authorize("admin"), userController.deleteUserById) //delete user by id
  .patch(jwtAuth, authorize("admin"), userController.updateUserById); //cập nhật user by id
//---------------

module.exports = router;
