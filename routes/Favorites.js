const express = require("express");
const router = express.Router();
const Users = require("../model/User");

router.get("/", async (req, res) => {
  const lt = req.query.lt ? +req.query.lt : 999999;
  const gt = req.query.gt ? +req.query.gt : 0;

  const user = res.locals.user;
  const pro = await Users.findById(user._id).populate(
    "favorites.items.product"
  );
  let filterPrice = [];
  pro.favorites.items.forEach((item) => {
    if (item.product.price > gt && item.product.price < lt) {
      filterPrice.push(item);
    }
  });

  res.render("favorites", {
    title: "Favorites page",
    product: filterPrice,
  });
});

router.post("/:id", async (req, res) => {
  const user = res.locals.user;
  if (user === undefined) {
    res.redirect("/favorites");
    return;
  }
  const isProductYes = user.favorites.items.find(
    (item) => item.product._id == req.params.id
  );

  if (isProductYes) {
    res.redirect("/favorites");
    return;
  }

  try {
    await Users.findOneAndUpdate(
      { _id: user._id },
      {
        $push: { "favorites.items": { product: req.params.id } },
      }
    );
    res.redirect("/favorites");
  } catch (error) {
    console.log(error);
    res.redirect("/favorites");
  }
});

router.get("/delete/:id", async (req, res) => {
  try {
    const userUpdate = await Users.findOneAndUpdate(
      { _id: res.locals.user._id },
      {
        $pull: {
          "favorites.items": { product: req.params.id },
        },
      }
    );
    res.redirect("/favorites");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
