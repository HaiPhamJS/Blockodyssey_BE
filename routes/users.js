var express = require("express");
const {
  create_user,
  get_user,
  delete_user,
  list_user,
  update_user,
} = require("../controllers/user.controllers");
var router = express.Router();

router.get("/", list_user);
router.get("/:id", get_user);
router.post("/", create_user);
router.put("/:id", update_user);
router.delete("/:id", delete_user);

module.exports = router;
