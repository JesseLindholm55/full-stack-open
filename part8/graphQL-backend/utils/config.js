require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
const TOKEN_KEY = process.env.TOKEN_KEY;

module.exports = {
  MONGODB_URI,
  TOKEN_KEY,
};
