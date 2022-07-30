const url = 'mongodb+srv://sherzod:Rh4oLw5ie68E9Dbx@cluster0.u2igbzj.mongodb.net/severyanochka'
// const url = "mongodb://localhost:27017/myapp";
const mongoose = require("mongoose");
// Rh4oLw5ie68E9Dbx
module.exports = async () => {
  try {
    await mongoose.connect(url, () => {
      console.log("MongoDB connected successfully");
    });
  } catch (error) {
    console.log(error);
  }
};
