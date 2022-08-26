const blogs = []

const blogsReducer = (state = blogs, action) => {
    switch (action.type) {
        case 'SET_BLOGS':
            const newBlogs = action.blogs
            return newBlogs

        case 'CREATE_NEW_BLOG':
            const createdBlog = action.blog
            let oldBlogs = JSON.parse(JSON.stringify(state))
            oldBlogs = [...oldBlogs, createdBlog]
            return oldBlogs

        case 'LIKE':
            let allBlogs = JSON.parse(JSON.stringify(state))
            for (let i = 0; i < allBlogs.length; i++) {
                const element = allBlogs[i]
                if (element.id === action.blog.id) {
                    element.likes++
                    return allBlogs
                }
            }
            return state

        case 'DELETE_BLOG':
            let blogs = JSON.parse(JSON.stringify(state))
            for (let j = 0; j < blogs.length; j++) {
                const element = blogs[j]
                if (element.id === action.id) {
                    blogs.splice(j, 1)
                    return blogs
                }
            }
            return blogs

        default:
            return state
    }
}

export default blogsReducer
