// library.js
const _ = require('lodash');

// Function to filter books by genre and year, and extract specific properties
function filterAndExtractBookInfo(books, genre, minYear, properties) {
  // Filter books by genre
  const filteredByGenre = _.filter(books, { 'genre': genre });

  // Further filter books by year
  const filteredBooks = _.filter(filteredByGenre, (book) => book.year >= minYear);

  // Extract the specified properties using pluck (map in lodash 4)
  const extractedInfo = filteredBooks.map(book => {
    return _.pick(book, properties);
  });

  // Extract the titles of the filtered books
  const bookTitles = _.pluck(filteredBooks, 'title');

  return {
    extractedInfo,
    bookTitles
  };
}

// Export the function for use in other files
module.exports = filterAndExtractBookInfo;
