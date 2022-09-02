const { gql } = require("apollo-server");

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
    password: String!
    token: String!
  }

  type Token {
    value: String!
  }

  type Query {
    allAuthors: [Author!]
    authorsCount: Int!
    allBooks(author: String, genre: String): [Book!]
    booksCount: Int!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book!
    addAuthor(name: String!, born: Int): Author
    editAuthor(name: String!, setBornTo: Int): Author!
    createUser(
      username: String!
      favoriteGenre: String!
      password: String!
    ): User
    login(username: String!, password: String!): Token
    me: User!
  }
  type Subscription {
    bookAdded: Book!
  }
`;

module.exports = typeDefs;
