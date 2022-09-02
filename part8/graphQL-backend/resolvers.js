const Author = require("./models/Author");
const Book = require("./models/Book");
const { UserInputError, AuthenticationError } = require("apollo-server");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const Token = require("./models/Token");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = require("./utils/config");

const resolvers = {
  Query: {
    authorsCount: async () => Author.find({}).length,
    allAuthors: async () => {
      const authors = await Author.find({});
      const books = await Book.find({});

      const checkBooks = (author) => {
        return books.filter(
          (book) => book.author.toString() === author._id.toString()
        ).length;
      };

      const authorsWithBookCount = authors.map((author) => {
        author.bookCount = checkBooks(author);
        return author;
      });
      return authorsWithBookCount;
    },
    allBooks: async (root, args) => {
      let authorId = null;
      if (!args.hasOwnProperty("author") && !args.hasOwnProperty("genre")) {
        return Book.find({}).populate("author");
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author });
        authorId = author._id.toString();
      }
      if (authorId && args.genre) {
        const books = await Book.find({ genres: args.genre }).populate(
          "author"
        );
        return books.filter((book) => book.author._id.toString() === authorId);
      } else if (authorId) {
        const books = await Book.find({}).populate("author");
        return books.filter((book) => book.author._id.toString() === authorId);
      } else if (args.genre)
        return Book.find({ genres: args.genre }).populate("author");
    },
    booksCount: async () => Book.find({}).length,
    me: (root, args, context) => context.currentUser,
  },

  Mutation: {
    addAuthor: async (root, args) => {
      if (args.name.length < 3) throw new UserInputError("Name too short");
      const author = new Author({ ...args });
      return author.save();
    },
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError("Not authenticated");

      if (args.author.length < 3)
        throw new UserInputError("Author name too short");
      else if (args.title.length < 3)
        throw new UserInputError("Book name too short");
      const book = new Book({ ...args });
      book.author = await Author.findOne({ name: args.author });
      if (!book.author) {
        const author = new Author({ name: args.author });
        book.author = await author.save();
      }
      pubsub.publish("BOOK_ADDED", { bookAdded: book });
      return book.save();
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) throw new AuthenticationError("Not authenticated");
      if (args.setBornTo === undefined)
        throw new UserInputError("Give born to value.");
      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo }
      );
      return author;
    },
    createUser: async (root, args) => {
      if (!args.username || !args.password)
        throw new UserInputError("Give both username and password");
      else {
        let user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre,
        });
        const saltRounds = 10;
        user.password = await bcrypt.hash(args.password, saltRounds);
        return await user.save();
      }
    },
    login: async (root, args) => {
      if (!args.username || !args.password)
        throw new UserInputError("Give both username and password");
      else {
        const user = await User.findOne({ username: args.username });
        if (!user) throw new UserInputError("No user found.");
        const result = await bcrypt.compare(args.password, user.password);
        if (result === true) {
          const token = jwt.sign(
            { username: args.username, id: user.id },
            TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          let newToken = new Token({ value: token });
          return newToken;
        } else throw new Error("Invalid password");
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = resolvers;
