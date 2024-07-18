// index.js
const filterAndExtractBookInfo = require('./library');

// Sample data: array of books
const books = [
  { title: 'Book A', author: 'Author 1', genre: 'Fiction', year: 2001, isbn: '1111' },
  { title: 'Book B', author: 'Author 2', genre: 'Fiction', year: 2005, isbn: '2222' },
  { title: 'Book C', author: 'Author 3', genre: 'Non-Fiction', year: 2010, isbn: '3333' },
  { title: 'Book D', author: 'Author 4', genre: 'Fiction', year: 1999, isbn: '4444' },
  { title: 'Book E', author: 'Author 5', genre: 'Non-Fiction', year: 2003, isbn: '5555' }
];

// Parameters for the function
const genre = 'Fiction';
const minYear = 2000;
const properties = ['title', 'author', 'year'];

// Call the function and get the result
const result = filterAndExtractBookInfo(books, genre, minYear, properties);

// Output the result
console.log('Extracted Book Info:', result.extractedInfo);
console.log('Book Titles:', result.bookTitles);
