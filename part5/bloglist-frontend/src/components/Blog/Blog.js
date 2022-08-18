import { useState } from 'react'
import Togglable from '../Togglable/Togglable'
import blogService from '../../services/blogs'

const Blog = (props) => {
    const [currentBlog, setCurrentBlog] = useState(props.blog)
    const [showObject, setShowObject] = useState({ display: 'block' })
    const addLike = () => {
        let newBlog = currentBlog
        newBlog.likes++
        blogService.update(newBlog).then(response => {
            if (Object.prototype.hasOwnProperty.call(response, 'title')) {
                setCurrentBlog(newBlog)
                props.updateMessage({ content: 'Like added and list order maybe modified', error: false })
                props.updateList()
            } else {
                currentBlog.likes--
                props.updateMessage({ content: 'Error with adding', error: true })
            }
        })

    }

    const removeBlog =  () => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            blogService.remove(currentBlog.id).then(
                response => {
                    if (!Object.prototype.hasOwnProperty.call(response, 'error')) {
                        setShowObject({ display: 'none' })
                        props.updateMessage({ content: `Blog ${currentBlog.title} deleted.` })
                    } else {
                        props.updateMessage({ content: 'You don\'t have the rights to delete this blog.', error: true })
                    }
                }
            )
        }
    }


    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={showObject}>
            <div style={blogStyle}>
                <span>{currentBlog.title} {currentBlog.author}</span>
                <Togglable key={currentBlog.id + 1} buttonLabel="Show additional information">
                    <div>{currentBlog.url}</div>
                    <div>
                        <span>{currentBlog.likes}</span>
                        <button type="button" onClick={() => addLike()}>Like</button>
                    </div>
                    <div>{currentBlog.user.name}</div>
                    <button type="button" onClick={() => {removeBlog()}}>Remove blog</button>
                </Togglable>
            </div>
        </div>
    )
}

export default Blog