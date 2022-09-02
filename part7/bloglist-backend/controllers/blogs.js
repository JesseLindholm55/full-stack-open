const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  let blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response, next) => {
  let blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const user = request.user;
  if (body.title === undefined && body.url === undefined)
    response.status(400).end();
  else {
    if (body.likes === undefined) body.likes = 0;
    if (body.author === undefined) body.author = user.name;
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });

    let savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    let object = { blog: savedBlog, user: user };
    response.status(201).json(object);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  let userId = request.user._id;
  let blog = await Blog.findById(request.params.id);
  if (blog.user.toString() === userId.toString()) {
    try {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).send({ message: "Success" });
    } catch (err) {
      response.status(404).send({ message: "Unknown error" });
    }
  } else response.status(400).send({ message: "Wrong id" });
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.title,
    likes: body.likes,
  };
  try {
    let updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.status(200).json(updatedBlog);
  } catch (err) {
    response.status(404).send({ error: "Blog update failed" });
  }
});

module.exports = blogsRouter;
