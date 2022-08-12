const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = 0
    for (let i = 0; i < blogs.length; i++) {
        const element = blogs[i];
        likes += element.likes
    }
    return likes
}

const favouriteBlog = (blogs) => {
    let likes = 0
    let blog = null
    for (let i = 0; i < blogs.length; i++) {
        const element = blogs[i];
        if (likes < element.likes) {
            likes = element.likes
            blog = {title: element.title, author: element.author, likes: element.likes}
        }
    }
    return blog
}

const mostBlogs = (blogs) => {
    let allBlogs = []
    // Go through all blogs we get
    for (let i = 0; i < blogs.length; i++) {
        const element = blogs[i];
        let doesExist = false
        // Go through all blogs we added
        for (let j = 0; j < allBlogs.length; j++) {
            const item = allBlogs[j];
            if (element.author == item.author) {
                item.blogs++
                doesExist = true
                break
            }
        }
        // If does not exist add to allBlogs
        if (!doesExist) allBlogs.push({author: element.author, blogs: 1})
    }
    let biggestBlog = null
    // Check allBlogs for biggest ".blogs" count
    for (let l = 0; l < allBlogs.length; l++) {
        const blog = allBlogs[l];
        if (biggestBlog == null) biggestBlog = blog
        else if (blog.blogs > biggestBlog.blogs) biggestBlog = blog
    }
    // return object
    return biggestBlog
}

const mostLikes = (blogs) => {
    let allBlogs = []
    // Go through all blogs we get
    for (let i = 0; i < blogs.length; i++) {
        const element = blogs[i];
        let doesExist = false
        // Go through all blogs we added
        for (let j = 0; j < allBlogs.length; j++) {
            const item = allBlogs[j];
            if (element.author == item.author) {
                item.likes += element.likes
                doesExist = true
                break
            }
        }
        // If does not exist add to allBlogs
        if (!doesExist) allBlogs.push({author: element.author, likes: element.likes})
    }
    let biggestBlog = null
    // Check allBlogs for biggest ".blogs" count
    for (let l = 0; l < allBlogs.length; l++) {
        const blog = allBlogs[l];
        if (biggestBlog == null) biggestBlog = blog
        else if (blog.likes > biggestBlog.likes) biggestBlog = blog
    }
    // return object
    return biggestBlog
}
  
module.exports = {
    dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
}