const router = require("express").Router();
const {
  validateClothingItem,
  validateItemId,
} = require("../middlewares/validation");
const auth = require("../middlewares/auth");
const {
  getClothingItems,
  createItems,
  deleteItems,
  likeItems,
  dislikeItems,
} = require("../controllers/clothingitems");

router.get("/", getClothingItems);
router.post("/", auth, validateClothingItem, createItems);
router.delete("/:itemId", auth, validateItemId, deleteItems);
router.put("/:itemId/likes", auth, validateItemId, likeItems);
router.delete("/:itemId/likes", auth, validateItemId, dislikeItems);

module.exports = router;
