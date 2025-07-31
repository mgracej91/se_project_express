const router = require("express").Router();
const userRouter = require("./users");
const clothingItems = require("./clothingItems");
const { errorStatus } = require("../utils/errors");
const { login, createUser } = require("../controllers/users");

router.use("/users", userRouter);
router.use("/items", clothingItems);

router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  res.status(errorStatus.notFound).send({ errorMessage: "Page not found" });
});

module.exports = router;
