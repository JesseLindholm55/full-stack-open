const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../index");
const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "HTML is easy",
    author: "Jack Johnson",
    likes: 1,
    url: "seppo.com",
  },
  {
    title: "Browser can execute only JavaScript",
    author: "Jack Nicholson",
    likes: 153,
    url: "artsi.com",
  },
];
let tokenForTests = null;

describe("Blog tests", () => {
  beforeAll(async () => {
    await api
      .post("/api/users")
      .send({ username: "Jack", password: "asd123", name: "El Guardian" });
    let response = await api
      .post("/api/login")
      .send({ username: "Jack", password: "asd123" });
    tokenForTests = response.body.token;
  });

  beforeEach(async () => {
    await Blog.deleteMany({});
    for (let i = 0; i < initialBlogs.length; i++) {
      const element = initialBlogs[i];
      await api
        .post("/api/blogs")
        .set("Authorization", "Bearer " + tokenForTests)
        .send(element);
    }
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .set("Authorization", "Bearer " + tokenForTests)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", "Bearer " + tokenForTests);

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("a specific blog is within the returned blogs", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", "Bearer " + tokenForTests);

    const contents = response.body.map((r) => r.title);
    expect(contents).toContain("Browser can execute only JavaScript");
  });

  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "async/await simplifies making async calls",
      likes: 132,
      url: "www.jacksonfive.com",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", "Bearer " + tokenForTests)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api
      .get("/api/blogs")
      .set("Authorization", "Bearer " + tokenForTests);

    const contents = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(contents).toContain("async/await simplifies making async calls");
  });

  test("blog without title and url is not added", async () => {
    const newBlog = {
      likes: 189,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", "Bearer " + tokenForTests)
      .send(newBlog)
      .expect(400);

    const response = await api
      .get("/api/blogs")
      .set("Authorization", "Bearer " + tokenForTests);

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("should have id on every database entry", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", "Bearer " + tokenForTests);

    for (let i = 0; i < response.length; i++) {
      const element = response[i];
      expect(element.id).toBeDefined();
    }
  });

  test("should set likes to 0 if not defined on create blog api call", async () => {
    const newBlog = {
      title: "Missing likes",
      url: "www.google.com",
    };
    const response = await api
      .post("/api/blogs")
      .set("Authorization", "Bearer " + tokenForTests)
      .send(newBlog)
      .expect(201);

    expect(response.body.likes).toBe(0);
  });

  test("should delete existing blog post", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", "Bearer " + tokenForTests);
    await api
      .delete(`/api/blogs/${response.body[0].id}`)
      .set("Authorization", "Bearer " + tokenForTests)
      .expect(204);
  });

  test("should delete existing blog post and fail with incorrect id", async () => {
    await api
      .delete(`/api/blogs/123`)
      .set("Authorization", "Bearer " + tokenForTests)
      .expect(404);
  });

  test("should update existing blog post", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", "Bearer " + tokenForTests);
    let likes = response.body[0].likes + 20;
    await api
      .put(`/api/blogs/${response.body[0].id}`)
      .set("Authorization", "Bearer " + tokenForTests)
      .send({ likes: likes })
      .expect(200);
  });

  test("should update existing blog post and fail with incorrect id", async () => {
    await api
      .put(`/api/blogs/123`)
      .set("Authorization", "Bearer " + tokenForTests)
      .expect(404);
  });

  test("should fail create blog with unauthorized status code", async () => {
    const newBlog = {
      title: "Will not go through",
      url: "kalanaamari.com",
      likes: 22,
    };

    await api.post("/api/blogs").send(newBlog).expect(401);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
