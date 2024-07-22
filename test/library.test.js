// test/library.test.js
const { expect } = require('chai');
const filterAndExtractBookInfo = require('../library');

describe('filterAndExtractBookInfo', () => {
  const books = [
    { title: 'New Book', author: 'Author 1', genre: 'Fiction', year: 2010, isbn: '1' },
    { title: 'Old Book', author: 'Author 2', genre: 'Fiction', year: 1999, isbn: '2' },
  ];

  it('should filter books by genre and year', () => {
    const genre = 'Fiction';
    const minYear = 2000;
    const properties = ['title'];

    const result = filterAndExtractBookInfo(books, genre, minYear, properties);

    expect(result.extractedInfo).to.deep.equal([
      { title: 'New Book' },
    ]);
  });
});
