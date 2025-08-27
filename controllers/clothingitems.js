const ClothingItem = require("../models/clothingItem");
const { NotFoundError, ForbiddenError } = require("../utils/errors");

const getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((err) => next(err));
};

const createItems = (req, res, next) => {
  const { name, imageUrl, weather } = req.body;
  const owner = req.user._id;
  ClothingItem.create({ name, imageUrl, weather, owner })
    .then((item) => {
      res.status(201).send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item ID format" });
      }
      return next(err);
    });
};

const deleteItems = (req, res, next) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail(() => {
      throw new NotFoundError("Item ID not found");
    })
    .then((item) => {
      if (!item.owner.equals(req.user._id)) {
        throw new ForbiddenError("Cannot delete item not owned by user");
      }
      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then(() => {
      res.status(200).send({ message: "Item deleted successfully" });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item ID format" });
      }
      return next(err);
    });
};

const likeItems = (req, res, next) => {
  const userId = req.user._id;
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Item ID not found");
    })
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item ID format" });
      }
      return next(err);
    });
};
const dislikeItems = (req, res, next) => {
  const userId = req.user._id;
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Item ID not found");
    })
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item ID format" });
      }
      return next(err);
    });
};

module.exports = {
  getClothingItems,
  createItems,
  deleteItems,
  likeItems,
  dislikeItems,
};
