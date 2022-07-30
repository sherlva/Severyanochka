const express = require("express");
const User = require("../model/User");
const router = express.Router();
const Users = require("../model/User");

router.get("/", async (req, res) => {
  const user = await User.findById(res.locals.user._id).populate('orders.items.product')
  // console.log(user.orders);
  res.render("order", {
    title: "Order",
    user
  });
});

router.post("/add", async (req, res) => {
  const user = await Users.findOne({ _id: res.locals.user._id });
  await Users.findOneAndUpdate(
    { _id: res.locals.user._id },
    {
      $push: { "orders.items": { $each: user.cart.items }, 'order.items': {price: user.cart.price} },
    }
  );
  await Users.findOneAndUpdate( 
    { _id: res.locals.user._id },
    {
      $set: { "cart.items": [], "cart.price": 0 },
    }
  );
  res.redirect("/order");
});

module.exports = router;
