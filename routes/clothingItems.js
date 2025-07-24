const router = require("express").Router();
const {
  getClothingItems,
  createItems,
  deleteItems,
  likeItems,
  dislikeItems,
} = require("../controllers/clothingitems");

router.get("/", getClothingItems);
router.post("/", createItems);
router.delete("/:itemId", deleteItems);
router.put("/:itemId/likes", likeItems);
router.delete("/:itemId/likes", dislikeItems);

module.exports = router;
