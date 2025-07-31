const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getClothingItems,
  createItems,
  deleteItems,
  likeItems,
  dislikeItems,
} = require("../controllers/clothingItems");

router.get("/", getClothingItems);
router.post("/", auth, createItems);
router.delete("/:itemId", auth, deleteItems);
router.put("/:itemId/likes", auth, likeItems);
router.delete("/:itemId/likes", auth, dislikeItems);

module.exports = router;
