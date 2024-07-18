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

  it('should handle no books matching the genre', () => {
    const genre = 'Science Fiction';
    const minYear = 2000;
    const properties = ['title', 'author', 'year'];

    const result = filterAndExtractBookInfo(books, genre, minYear, properties);

    expect(result.extractedInfo).to.deep.equal([]);
    expect(result.bookTitles).to.deep.equal([]);
  });

  it('should handle no books matching the year', () => {
    const genre = 'Non-Fiction';
    const minYear = 2015;
    const properties = ['title', 'author', 'year'];

    const result = filterAndExtractBookInfo(books, genre, minYear, properties);

    expect(result.extractedInfo).to.deep.equal([]);
    expect(result.bookTitles).to.deep.equal([]);
  });

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

  it('should measure the execution time of the function', () => {
    const genre = 'Fiction';
    const minYear = 2000;
    const properties = ['title', 'author', 'year'];
    
    const clock = sinon.useFakeTimers();
    const start = clock.now;

    filterAndExtractBookInfo(books, genre, minYear, properties);

    const end = clock.now;
    const executionTime = end - start;

    console.log(`Execution time: ${executionTime} ms`);
    expect(executionTime).to.be.greaterThan(0);

    clock.restore();
  });
});
