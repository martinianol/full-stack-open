const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')

const Author = require('./models/author')
const Book = require('./models/book')

const MONGODB_URI = 'mongodb+srv://fullstack:20303574@cluster0.yrs0y.mongodb.net/library-app?retryWrites=true'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id:ID!
    born: Int
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres:[String]
    ) : Book

    editAuthor(
      name: String!
      setBornTo: Int
    ) : Author

  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({}).populate('author')
      return books


      if (!args.author && !args.genre) {
        return books
      } else if (args.author && !args.genre) {
        return books.filter(book => book.author === args.author)
      } else if (!args.author && args.genre) {
        return books.filter(book => book.genres.includes(args.genre))
      } else {
        booksAuthor = books.filter(book => book.author === args.author)
        return booksAuthor.filter(book => book.genres.includes(args.genre))
      }
    },
    allAuthors: async (root, args) => {
      const authors = await Author.find({})
      const books = await Book.find({}).populate('author')
      console.log('books', books)

      authors.map(author => {
        bookCount = books.filter(book => book.author.name === author.name).length
        author.bookCount = bookCount
        return author
      })
      return authors
    }
  },
  Mutation: {
    addBook: (root, args) => {
      if (!authors.find(a => a.name === args.author)) {
        const author = { name: args.author, id: uuid() }
        authors = authors.concat(author)
      }
      const book = { ...args, id: uuid() }
      books = books.concat(book)
      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)

      if (!author) {
        return null
      }

      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(a => a.name === args.name
        ? updatedAuthor
        : a)
      return updatedAuthor
    }
  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})