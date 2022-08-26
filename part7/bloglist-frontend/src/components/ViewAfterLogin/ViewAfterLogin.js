import Blog from '../Blog/Blog'
import React, { useState } from 'react'
import Form from '../Form/Form'
import Togglable from '../Togglable/Togglable'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import UserInformation from '../UserInformation/UserInformation'
import { useNavigate } from 'react-router-dom'

const ViewAfterLogin = React.forwardRef((props, ref) => {
    const [closed, setClosed] = useState(false)
    const blogs = useSelector((state) => state.blogs)
    const login = useSelector((state) => state.login)

    const navigate = useNavigate()

    const messageUpdateFromChildren = (content) => {
        props.updateMessage(content)
    }

    const updateBlogsFromChildren = (content) => {
        props.updateBlogs(content)
    }

    const closeBlogs = () => {
        if (closed === false) setClosed(true)
    }

    function compareLikes(a, b) {
        if (a.likes < b.likes) {
            return 1
        }
        if (a.likes > b.likes) {
            return -1
        }
        return 0
    }

    const updateList = () => {
        props.blogs = props.blogs.sort(compareLikes)
    }

    const navigateToSingleBlog = (id) => {
        navigate(`/single-blog/${id}`)
    }

    return (
        <div style={{ padding: '20px' }}>
            <UserInformation />
            {login.loggedIn ? (
                <div>
                    <h2 style={{ fontWeight: 'bold' }}>Blogs</h2>
                    <Togglable childrenClose={closed} buttonLabel="Create blog">
                        <Form
                            updateMessage={messageUpdateFromChildren}
                            updateBlogs={updateBlogsFromChildren}
                            closeTogglable={closeBlogs}
                        />
                    </Togglable>
                    <h3
                        style={{
                            marginBottom: '10px',
                            marginTop: '20px',
                            fontWeight: 'bold'
                        }}
                    >
                        List of blogs
                    </h3>
                    {blogs.sort(compareLikes).map((blog) => (
                        <a onClick={() => navigateToSingleBlog(blog.id)}>
                            <Blog
                                key={blog.id}
                                updateMessage={messageUpdateFromChildren}
                                blog={blog}
                                updateList={updateList}
                            />
                        </a>
                    ))}
                </div>
            ) : null}
        </div>
    )
})

ViewAfterLogin.displayName = 'View after login'

ViewAfterLogin.propTypes = {
    blogs: PropTypes.array.isRequired
}

export default ViewAfterLogin
