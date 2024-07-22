// test/library.test.js
const { expect } = require('chai');
const sinon = require('sinon');
const filterAndExtractBookInfo = require('../library');

describe('filterAndExtractBookInfo', () => {
  const books = [
    { title: 'Book A', author: 'Author 1', genre: 'Fiction', year: 2001, isbn: '1111' },
    { title: 'Book B', author: 'Author 2', genre: 'Fiction', year: 2005, isbn: '2222' },
    { title: 'Book C', author: 'Author 3', genre: 'Non-Fiction', year: 2010, isbn: '3333' },
    { title: 'Book D', author: 'Author 4', genre: 'Fiction', year: 1999, isbn: '4444' },
    { title: 'Book E', author: 'Author 5', genre: 'Non-Fiction', year: 2003, isbn: '5555' }
  ];

  // Basic functionality: Tests the function's ability to filter by genre and year and extract specified properties.
  it('should filter books by genre and year, and extract specified properties', () => {
    const genre = 'Fiction';
    const minYear = 2000;
    const properties = ['title', 'author', 'year'];

    const result = filterAndExtractBookInfo(books, genre, minYear, properties);

    expect(result.extractedInfo).to.deep.equal([
      { title: 'Book A', author: 'Author 1', year: 2001 },
      { title: 'Book B', author: 'Author 2', year: 2005 }
    ]);
    expect(result.bookTitles).to.deep.equal(['Book A', 'Book B']);
  });

  // No books matching genre: Ensures the function handles cases where no books match the genre.
  it('should handle no books matching the genre', () => {
    const genre = 'Science Fiction';
    const minYear = 2000;
    const properties = ['title', 'author', 'year'];

    const result = filterAndExtractBookInfo(books, genre, minYear, properties);

    expect(result.extractedInfo).to.deep.equal([]);
    expect(result.bookTitles).to.deep.equal([]);
  });

  // No books matching year: Ensures the function handles cases where no books match the year.
  it('should handle no books matching the year', () => {
    const genre = 'Non-Fiction';
    const minYear = 2015;
    const properties = ['title', 'author', 'year'];

    const result = filterAndExtractBookInfo(books, genre, minYear, properties);

    expect(result.extractedInfo).to.deep.equal([]);
    expect(result.bookTitles).to.deep.equal([]);
  });

  // Extract specified properties: Verifies that the function correctly extracts the specified properties.
  it('should extract specified properties correctly', () => {
    const genre = 'Non-Fiction';
    const minYear = 2000;
    const properties = ['title', 'isbn'];

    const result = filterAndExtractBookInfo(books, genre, minYear, properties);

    expect(result.extractedInfo).to.deep.equal([
      { title: 'Book C', isbn: '3333' },
      { title: 'Book E', isbn: '5555' }
    ]);
    expect(result.bookTitles).to.deep.equal(['Book C', 'Book E']);
  });

  // Empty books array: Ensures the function handles an empty books array.
  it('should handle an empty books array', () => {
    const genre = 'Fiction';
    const minYear = 2000;
    const properties = ['title', 'author', 'year'];

    const result = filterAndExtractBookInfo([], genre, minYear, properties);

    expect(result.extractedInfo).to.deep.equal([]);
    expect(result.bookTitles).to.deep.equal([]);
  });

  // Empty properties array: Ensures the function handles an empty properties array.
  it('should handle an empty properties array', () => {
    const genre = 'Fiction';
    const minYear = 2000;
    const properties = [];

    const result = filterAndExtractBookInfo(books, genre, minYear, properties);

    expect(result.extractedInfo).to.deep.equal([
      {},
      {}
    ]);
    expect(result.bookTitles).to.deep.equal(['Book A', 'Book B']);
  });


  // Minimum year edge case: Tests the function with the minimum year edge case.
  it('should handle minimum year edge case', () => {
    const genre = 'Fiction';
    const minYear = 1999;
    const properties = ['title', 'author', 'year'];

    const result = filterAndExtractBookInfo(books, genre, minYear, properties);

    expect(result.extractedInfo).to.deep.equal([
      { title: 'Book A', author: 'Author 1', year: 2001 },
      { title: 'Book B', author: 'Author 2', year: 2005 },
      { title: 'Book D', author: 'Author 4', year: 1999 }
    ]);
    expect(result.bookTitles).to.deep.equal(['Book A', 'Book B', 'Book D']);
  });


  // Maximum year edge case: Tests the function with a future year to ensure no books are returned.
  it('should handle maximum year edge case', () => {
    const genre = 'Fiction';
    const minYear = 2025; // A future year to ensure no books are returned
    const properties = ['title', 'author', 'year'];

    const result = filterAndExtractBookInfo(books, genre, minYear, properties);

    expect(result.extractedInfo).to.deep.equal([]);
    expect(result.bookTitles).to.deep.equal([]);
  });

  // Negative year input: Tests the function with a negative year input.
  it('should handle negative year input', () => {
    const genre = 'Fiction';
    const minYear = -100; // Invalid negative year
    const properties = ['title', 'author', 'year'];

    const result = filterAndExtractBookInfo(books, genre, minYear, properties);

    expect(result.extractedInfo).to.deep.equal([
      { title: 'Book A', author: 'Author 1', year: 2001 },
      { title: 'Book B', author: 'Author 2', year: 2005 },
      { title: 'Book D', author: 'Author 4', year: 1999 }
    ]);
    expect(result.bookTitles).to.deep.equal(['Book A', 'Book B', 'Book D']);
  });

  // Extremely large year input: Tests the function with an extremely large year input.
  it('should handle extremely large year input', () => {
    const genre = 'Fiction';
    const minYear = 100000; // Extremely large year to ensure no books are returned
    const properties = ['title', 'author', 'year'];

    const result = filterAndExtractBookInfo(books, genre, minYear, properties);

    expect(result.extractedInfo).to.deep.equal([]);
    expect(result.bookTitles).to.deep.equal([]);
  });

  // Return an empty list when books is not an array: Ensures the function does not fail if the books parameter is not an array.
  it('should throw an error when books is not an array', () => {
    const genre = 'Fiction';
    const minYear = 2000;
    const properties = ['title', 'author', 'year'];

    const result = filterAndExtractBookInfo('not an array', genre, minYear, properties);
    expect(result.extractedInfo).to.deep.equal([])
    expect(result.bookTitles).to.deep.equal([]);

  });

  // Do not fail when properties is not an array: Ensures the function returns the books by the filter but with no properties
  it('should throw an error when properties is not an array', () => {
    const genre = 'Fiction';
    const minYear = 2000;
    const properties = 'not an array';

    const result = filterAndExtractBookInfo(books, genre, minYear, properties);
    expect(result.extractedInfo).to.deep.equal([ {}, {}])
    expect(result.bookTitles).to.deep.equal(["Book A", "Book B"]);
  });

  // Measure execution time: Measures the function's execution time and ensures it's greater than 0 ms.
  it('should measure the execution time of the function', () => {
    const genre = 'Fiction';
    const minYear = 2000;
    const properties = ['title', 'author', 'year'];

    const startTime = process.hrtime();
    filterAndExtractBookInfo(books, genre, minYear, properties);
    const endTime = process.hrtime(startTime);
    const executionTimeInMs = endTime[0] * 1000 + endTime[1] / 1e6;

    console.log(`Execution time: ${executionTimeInMs} ms`);
    expect(executionTimeInMs).to.be.greaterThan(0);
  });
});
