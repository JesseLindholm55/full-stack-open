const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;
  if (username === undefined || password === undefined)
    response
      .status(400)
      .send({ error: "Username and password must be defined." });
  else if (username.length < 3 || password.length < 3)
    response
      .status(400)
      .send({ error: "Username and password must be atleast 3 characters." });
  else {
    let allUsers = await User.find({});
    let doesExist = false;
    for (let i = 0; i < allUsers.length; i++) {
      const element = allUsers[i];
      if (element.username === username) {
        doesExist = true;
        break;
      }
    }
    if (doesExist)
      response.status(400).send({ error: "Username already exists." });
    else {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const user = new User({
        username,
        name,
        passwordHash,
      });

      const savedUser = await user.save();
      response.status(201).json(savedUser);
    }
  }
});

usersRouter.get("/", async (request, response) => {
  let users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });
  if (users) response.status(200).json(users);
  else response.status(404).end();
});

usersRouter.get("/:id", async (request, response) => {
    let user = await User.findById(request.params.id).populate('blogs', {title: 1})
    if (user) response.status(200).json(user);
    else response.status(404).send({message: "User id wrong."})
  });

module.exports = usersRouter;
