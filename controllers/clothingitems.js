const ClothingItem = require("../models/clothingItem");
const { errorHandler } = require("../utils/errors");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((err) => {
      errorHandler(err, res);
    });
};

const createItems = (req, res) => {
  const { name, imageUrl, weather } = req.body;
  const owner = req.user._id;
  ClothingItem.create({ name, imageUrl, weather, owner })
    .then((item) => {
      res.status(201).send(item);
    })
    .catch((err) => {
      errorHandler(err, res);
    });
};

const deleteItems = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        const error = new Error("Cannot delete item not owned by user");
        error.statusCode = 403;
        error.name = "ForbiddenError";
        throw error;
      }
      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then(() => {
      res.status(200).send({ message: "Item deleted successfully" });
    })
    .catch((err) => {
      errorHandler(err, res);
    });
};

const likeItems = (req, res) => {
  const userId = req.user._id;
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("User ID not found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      errorHandler(err, res);
    });
};
const dislikeItems = (req, res) => {
  const userId = req.user._id;
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("User ID not found");
      error.statusCode = 404;
      throw error;
    })
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      errorHandler(err, res);
    });
};

module.exports = {
  getClothingItems,
  createItems,
  deleteItems,
  likeItems,
  dislikeItems,
};
