const router = require("express").Router();
const userRouter = require("./users");
const clothingItems = require("./clothingItems");
const { errorStatus } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", clothingItems);

router.use((req, res) => {
  res.status(errorStatus.notFound).send({ errorMessage: "Page not found" });
});

module.exports = router;
