import * as listHelper from '../utils/listHelper.js';
import { blogs, listWithOneBlog, empyList } from './helpers/testHelpers.js';

describe('total likes', () => {
  test('when list has several blogs, equals the likes of that', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('when list is empty of blogs, equals the like of that', () => {
    const result = listHelper.totalLikes(empyList);
    expect(result).toBe(0);
  });
});

describe('favorite blog', () => {
  test('when list serveral blogs, favorite equals to', () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    });
  });

  test('when list has only one blog, favorite equals to', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual({
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    });
  });

  test('when list is empty of blogs, favorite equals to', () => {
    const result = listHelper.favoriteBlog(empyList);
    expect(result).toEqual(undefined);
  });

  test('when list is undefined of blogs, favorite equals to', () => {
    const result = listHelper.favoriteBlog(undefined);
    expect(result).toEqual(undefined);
  });
});

describe('Most appearances', () => {
  test('when list serveral blogs, result equals to', () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual(
      {
        author: 'Robert C. Martin',
        blogs: 3,
      },
    );
  });

  test('when list has only one blog, result equals to', () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual(
      {
        author: 'Edsger W. Dijkstra',
        blogs: 1,
      },
    );
  });

  test('when list is empty of blogs, result equals to', () => {
    const result = listHelper.mostBlogs(empyList);
    expect(result).toEqual(undefined);
  });

  test('when list is undefined of blogs, favorite equals to', () => {
    const result = listHelper.mostBlogs(undefined);
    expect(result).toEqual(undefined);
  });
});

describe('Most likes', () => {
  test('when list serveral blogs, result equals to', () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual(
      {
        author: 'Edsger W. Dijkstra',
        likes: 17,
      },
    );
  });

  test('when list has only one blog, result equals to', () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual(
      {
        author: 'Edsger W. Dijkstra',
        likes: 5,
      },
    );
  });

  test('when list is empty of blogs, result equals to', () => {
    const result = listHelper.mostLikes(empyList);
    expect(result).toEqual(undefined);
  });

  test('when list is undefined of blogs, favorite equals to', () => {
    const result = listHelper.mostLikes(undefined);
    expect(result).toEqual(undefined);
  });
});
