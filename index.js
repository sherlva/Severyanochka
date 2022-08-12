const express = require("express");
const { create } = require("express-handlebars");
const path = require("path");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const app = express();
const hbs = create({
  extname: "hbs",
  defaultLayout: "layout",
  runtimeOptions: {
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true,
  },
});

require("./helper/db")();
const store = new MongoDBStore({
  uri: "mongodb+srv://sherzod:Rh4oLw5ie68E9Dbx@cluster0.u2igbzj.mongodb.net/severyanochka",
  collection: "mySession",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "some secret key",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

// importing middlewares
const authMiddleware = require("./middleware/auth");
const userMiddleware = require("./middleware/user");
const userDataMiddleware = require("./middleware/userData");
const getCartMiddleware = require('./middleware/getCart');

// importing routes
const homeR = require("./routes/homeRouter");
const catalogR = require("./routes/catalogRouter");
const orderRouter = require("./routes/order");
const savedRouter = require("./routes/saved");
const contactRouter = require("./routes/contact");
const vacansyRouter = require("./routes/vacansy");
const favorites = require("./routes/favorites");
const authAdminRouter = require("./routes/admin/auth");
const adminRouter = require("./routes/admin/admin");
const card = require("./routes/card");
const shopCardRouter = require("./routes/shopCard");
const regstration = require("./routes/regstration");

// routing
app.use(userMiddleware);
app.use(userDataMiddleware);
app.use(getCartMiddleware);
app.use("/", homeR);
app.use("/catalog", catalogR);
app.use("/order", orderRouter);
app.use("/saved", savedRouter);
app.use("/contact", contactRouter);
app.use("/vacansy", vacansyRouter);
app.use("/favorites", favorites);
app.use("/api", authAdminRouter);
app.use("/card", card);
app.use("/shopping", shopCardRouter);
app.use("/regstration", regstration);
app.use("/admin", authMiddleware, adminRouter);

try {
  const port = normalizePort(process.env.PORT || 3000);
  app.listen(port, () => {
    console.log(`Sever ${port} porti bilan ishlayapti`);
  });
} catch (error) {
  console.error(error);
}

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}
