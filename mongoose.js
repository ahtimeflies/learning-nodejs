var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mongoose', { useUnifiedTopology: true })

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', function () {
  console.log('Connection Successful!')

  // define Schema
  const BookSchema = mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
  })

  // compile schema to model
  const Book = mongoose.model('Book', BookSchema, 'bookstore')

  // a document instance
  const book1 = new Book({ name: 'Introduction to Mongoose', price: 10, quantity: 25 })

  // save model to database
  book1.save(function (err, book) {
    if (err) return console.error(err)
    console.log(book.name + ' saved to bookstore collection.')
  })

  // documents array
  const books = [{ name: 'Mongoose Tutorial', price: 10, quantity: 25 },
    { name: 'NodeJS tutorial', price: 15, quantity: 5 },
    { name: 'MongoDB Tutorial', price: 20, quantity: 2 }]

  // save multiple documents to the collection referenced by Book Model
  Book.collection.insert(books, function (err, docs) {
    if (err) {
      return console.error(err)
    }
    console.log('Multiple documents inserted to Collection')
  })
})
