const router = require("express").Router();
const { getCurrentUser, updateProfile } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.get("/users/me", auth, getCurrentUser);
router.patch("/users/me", auth, updateProfile);

module.exports = router;
