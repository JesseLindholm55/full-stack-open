const listHelper = require('../utils/list-helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

const multipleBlogs = [
    {
        _id: '123',
        title: 'Blog 1',
        author: 'Edgar Boogeward',
        url: 'www.blogs.com/boogeward',
        likes: 10,
        __v: 2
    },
    {
        _id: '124',
        title: 'Blog 2',
        author: 'Edgar Jackson',
        url: 'www.blogs.com/jackson',
        likes: 27,
        __v: 2
    },
    {
        _id: '125',
        title: 'Blog 3',
        author: 'Edgar Nilah',
        url: 'www.blogs.com/nilah',
        likes: 333,
        __v: 2
    }
]

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
})

describe('total likes more than one', () => {
    test('should have correct amount of likes', () => {
        const result = listHelper.totalLikes(multipleBlogs)
        expect(result).toBe(370)
    })

    

})

describe('should return correct blog', () => {
    test('should return correct blog title with most likes', () => {
        const blog = listHelper.favouriteBlog(multipleBlogs)
        expect(blog.title).toBe('Blog 3')
        expect(blog).toEqual({title: 'Blog 3', author: 'Edgar Nilah', likes: 333})
    })
})

describe('should return blog object with most likes and author', () => {
    const multipleBlogsSameAuthor = [
        {
            _id: '123',
            title: 'Blog 1',
            author: 'Edgar Boogeward',
            url: 'www.blogs.com/boogeward',
            likes: 10,
            __v: 2
        },
        {
            _id: '124',
            title: 'Blog 2',
            author: 'Edgar Boogeward',
            url: 'www.blogs.com/jackson',
            likes: 27,
            __v: 2
        },
        {
            _id: '125',
            title: 'Blog 3',
            author: 'Edgar Nilah',
            url: 'www.blogs.com/nilah',
            likes: 333,
            __v: 2
        }
    ]

    test('should return object with Edgar Boogeward as author', () => {
        const biggestBlog = listHelper.mostBlogs(multipleBlogsSameAuthor)
        expect(biggestBlog).toEqual({author: 'Edgar Boogeward', blogs: 2})
    })
})

describe('should return biggest blog', () => {
    const multipleBlogsSameAuthor = [
        {
            _id: '123',
            title: 'Blog 1',
            author: 'Edgar Boogeward',
            url: 'www.blogs.com/boogeward',
            likes: 10,
            __v: 2
        },
        {
            _id: '124',
            title: 'Blog 2',
            author: 'Edgar Nilah',
            url: 'www.blogs.com/jackson',
            likes: 27,
            __v: 2
        },
        {
            _id: '125',
            title: 'Blog 3',
            author: 'Edgar Nilah',
            url: 'www.blogs.com/nilah',
            likes: 333,
            __v: 2
        }
    ]

    test('should return object with Edgar Nilah as author and 360 likes', () => {
        const biggestBlog = listHelper.mostLikes(multipleBlogsSameAuthor)
        expect(biggestBlog).toEqual({author: 'Edgar Nilah', likes: 360})
    })
})