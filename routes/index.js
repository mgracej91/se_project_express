const router = require("express").Router();
const userRouter = require("./users");
const clothingItems = require("./clothingItems");
const { login, createUser } = require("../controllers/users");

router.use("/users", userRouter);
router.use("/items", clothingItems);

router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res, next) => {
  const error = new Error("Page not found");
  error.statusCode = 404;
  next(error);
});

module.exports = router;
