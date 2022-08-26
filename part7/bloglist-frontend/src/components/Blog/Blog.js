import Togglable from '../Togglable/Togglable'
import blogService from '../../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import UserInformation from '../UserInformation/UserInformation'

const Blog = (props) => {
    const [blog, setBlog] = useState(null)
    const id = useParams().id
    const login = useSelector((state) => state.login)
    const getBlog = (id) => {
        if (id) {
            blogService.getBlogById(id).then(
                (response) => setBlog(response),
                (error) =>
                    dispatch({
                        type: 'CHANGE_MESSAGE',
                        message: {
                            content: 'There was an error with fetching blog',
                            error: true
                        }
                    })
            )
        }
    }
    if (!props.blog) {
        getBlog(id)
    }

    let dispatch = useDispatch()
    const addLike = (currentBlog) => {
        let likedBlog = JSON.parse(JSON.stringify(currentBlog))
        blogService.update(likedBlog).then(
            (response) => {
                dispatch({ type: 'LIKE', blog: response })
                dispatch({
                    type: 'CHANGE_MESSAGE',
                    message: {
                        content: `Added like to blog: ${currentBlog.title}`,
                        error: false
                    }
                })
            },
            (error) =>
                dispatch({
                    type: 'CHANGE_MESSAGE',
                    message: {
                        content: `Error with adding like, error message: ${error}`,
                        error: true
                    }
                })
        )
    }

    const removeBlog = (currentBlog) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            let blogName = currentBlog.title
            blogService.remove(currentBlog.id).then(
                (response) => {
                    dispatch({ type: 'DELETE_BLOG', id: currentBlog.id })
                    dispatch({
                        type: 'CHANGE_MESSAGE',
                        message: {
                            content: `Deleted blog: ${blogName}`,
                            error: false
                        }
                    })
                },
                (error) => {
                    if (error.response.status === 400) {
                        dispatch({
                            type: 'CHANGE_MESSAGE',
                            message: {
                                content:
                                    'No right for deleting pblog. Only creator of blog can delete it.',
                                error: true
                            }
                        })
                    } else
                        dispatch({
                            type: 'CHANGE_MESSAGE',
                            message: { content: 'Unknown error', error: true }
                        })
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
        <div style={blogStyle}>
            {props.blog ? (
                <div>
                    <span style={{ color: 'blue', cursor: 'pointer' }}>
                        {props.blog.title} {props.blog.author}
                    </span>
                </div>
            ) : (
                <div>
                    {blog && login.loggedIn ? (
                        <div>
                            <UserInformation />
                            <span>
                                {blog.title} {blog.author}
                            </span>
                            <Togglable
                                key={blog.id + 1}
                                buttonLabel="Show additional information"
                            >
                                <div>{blog.url}</div>
                                <div>
                                    <span>{blog.likes}</span>
                                    <button
                                        type="button"
                                        onClick={() => addLike(blog)}
                                    >
                                        Like
                                    </button>
                                </div>
                                <div>{blog.user.name}</div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        removeBlog(blog)
                                    }}
                                >
                                    Remove blog
                                </button>
                            </Togglable>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    )
}

export default Blog
