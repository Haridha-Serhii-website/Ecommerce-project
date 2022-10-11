const router = require("express").Router();
const Product = require("../models/Product.model");
const Order = require("../models/Order.model");

router.get("/orders", (req, res, next) => {
  res.render("orders/order");
});

// Create a new order in DB
router.post("/orders", (req, res, next) => {
  const newOrder = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    address: req.body.address,
    city: req.body.city,
    postalCode: req.body.postalCode,
  };
  Order.create(newOrder)
    .then(() => {
      console.log("Order is created");
      res.redirect("/orders/my-orders");
    })
    .catch((err) => {
      console.log("error creating new order in DB", err);
      next(err);
    });
});

//Get all orders from DB
router.get("/orders/my-orders", (req, res, next) => {
  Order.find()
    .then((ordersFromDB) => {
      console.log(ordersFromDB);
      res.render("orders/my-orders", ordersFromDB[0]);
    })
    .catch((err) => {
      console.log("error creating new order in DB", err);
      next(err);
    });
});

module.exports = router;
