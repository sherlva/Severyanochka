const express = require("express");
const router = express.Router();
const Users = require("../model/User");
const Products = require("../model/Mongo");

router.get("/", async (req, res) => {
  res.render("shopCard", {
    title: "Korzina",
  });
});

router.post("/add/:id", async (req, res) => {
  const productid = req.params.id;
  let userid;

  try {
    userid = res.locals.user._id;
  } catch (error) {
    res.redirect("/");
    return;
  }

  const cart = res.locals.cart;
  const product = await Products.findById(productid);

  if (!product) {
    res.redirect("/");
    return;
  }
  const isProductYes = cart.items.find((item) => item.product._id == productid);
  try {
    if (isProductYes) {
      await Users.findOneAndUpdate(
        { _id: userid, "cart.items.product": productid },
        {
          $inc: {
            "cart.price": product.price,
            "cart.items.$.count": 1,
          },
        }
      );
      res.redirect("/shopping");
      return;
    }

    await Users.findByIdAndUpdate(userid, {
      $push: { "cart.items": { product: productid } },
      $inc: {
        "cart.price": product.price,
      },
    });
    console.log("product added to shopping cart: " + userid);
  } catch (error) {
    console.log(error);
  }
  res.redirect("/shopping");
});

router.post("/upload/:productid/:mode", async (req, res) => {
  const userid = res.locals.user._id;
  const cart = res.locals.cart;
  const productid = req.params.productid;
  const mode = req.params.mode;
  const product = cart.items.find((item) => item.product._id == productid);

  if (!cart || !productid || !userid || !product) {
    res.redirect("/shopping");
    return;
  }

  try {
    if (mode === "plus") {
      const updatedData = await Users.findOneAndUpdate(
        { _id: userid, "cart.items.product": productid },
        {
          $inc: {
            "cart.items.$.count": 1,
            "cart.price": product.product.price,
          },
        }
      );
      res.json({
        message: "Product incremented to 1",
        ok: true,
        data: {
          count: product.count + 1,
          price: updatedData.cart.price + product.product.price,
        },
      });
      return;
    }
    if (mode === "minus") {
      if (product.count == 1) {
        const updatedData = await Users.findOneAndUpdate(
          { _id: userid, "cart.items.product": productid },
          {
            $inc: {
              "cart.price": -product.product.price,
            },
            $pull: {
              "cart.items": { product: productid },
            },
          }
        );
        res.json({
          message: "Product is deleted because count is 1",
          isDeleted: true,
          data: {
            price: updatedData.cart.price - product.product.price,
          },
          ok: true,
        });
        return;
      }
      const updatedData = await Users.findOneAndUpdate(
        { _id: userid, "cart.items.product": productid },
        {
          $inc: {
            "cart.items.$.count": -1,
          },
          $set: {
            "cart.price": cart.price - product.product.price,
          },
        }
      );
      res.json({
        message: "Product decrement to 1",
        ok: true,
        data: {
          count: product.count - 1,
          price: updatedData.cart.price - product.product.price,
        },
      });
      return;
    }
  } catch (error) {
    res.json({ message: error, ok: false });
    return;
  }
});

router.post("/removes", async (req, res) => {
  const { products } = req.body;
  
  let user = await Users.findById(res.locals.user._id).populate(
    "cart.items.product"
  );
  let totalPrice = 0;

  user.cart.items.forEach((element, index) => {
    if (products.includes(element.product._id)) {
      user.cart.items.splice(index, 1);
    }
  });

  user.cart.items.forEach((element, index) => {
    totalPrice += element.product.price;
  });

  user.cart.price = totalPrice;

  try {
    await Users.findByIdAndUpdate(res.locals.user._id, user);
  } catch (error) {
    console.log(error);
  }

  res.redirect("/shopping");
});

module.exports = router;
