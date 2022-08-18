import Blog from '../Blog/Blog'
import React, { useState } from 'react'
import Form from '../Form/Form'
import Togglable from '../Togglable/Togglable'
import PropTypes from 'prop-types'

/* eslint-disable no-unused-vars */
const ViewAfterLogin = React.forwardRef((props, ref) => { 
/* eslint-enable no-unused-vars */
    const [closed, setClosed] = useState(false)

    const messageUpdateFromChildren = (content) => {
        props.updateMessage(content)
    }

    const updateBlogsFromChildren = (content) => {
        props.updateBlogs(content)
    }

    const logout = () => {
        props.updateLoggedInView(false)
        localStorage.removeItem('token') 
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

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ fontWeight: 'bold' }}>User information</h2>
            <div>
                <span>{ props.userName } is logged in.</span>
                <button type='button' style={{ marginLeft: '5px' }} onClick={logout}>Log out</button>
            </div>
            <h2 style={{ fontWeight: 'bold' }}>Blogs</h2>
            <Togglable childrenClose={closed} buttonLabel="Create blog">
                <Form updateMessage={messageUpdateFromChildren} updateBlogs={updateBlogsFromChildren} closeTogglable={closeBlogs}/>
            </Togglable>
            <h3 style={{ marginBottom: '10px', marginTop: '20px', fontWeight: 'bold' }}>List of blogs</h3>
            {props.blogs.sort(compareLikes).map(blog =>
                <Blog key={blog.id} updateMessage={messageUpdateFromChildren} blog={blog} updateList={updateList} />
            )}
            
        </div>
    )
})

ViewAfterLogin.displayName = 'View after login'

ViewAfterLogin.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    blogs: PropTypes.array.isRequired
}
  
export default ViewAfterLogin