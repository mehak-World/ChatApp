const express = require("express");
const router = express.Router()
const {registerUser, loginUser, setAvatar, getAllUsers} = require("../controllers/auth")

router.post("/register", registerUser);
router.post("/login", loginUser)
router.post("/setAvatar/:user_id", setAvatar)
router.get("/contacts/:user_id", getAllUsers)

module.exports = router