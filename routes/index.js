const router = require("express").Router();
const userRouter = require("./users");
const clothingItems = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const { validateUser, validateLogin } = require("../middlewares/validation");
const NotFoundError = require("../utils/errors/NotFoundError");

router.use("/users", userRouter);
router.use("/items", clothingItems);

router.post("/signin", validateLogin, login);
router.post("/signup", validateUser, createUser);

router.use(() => {
  throw new NotFoundError("Page not found");
});

module.exports = router;
