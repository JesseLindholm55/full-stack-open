import { useState, useEffect } from 'react'
import Login from './components/Login/Login'
import blogService from './services/blogs'
import ViewAfterLogin from './components/ViewAfterLogin/ViewAfterLogin'
import Message from './components/Message/Message'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom'
import Users from './components/Users/Users'
import User from './components/User/User'
import Blog from './components/Blog/Blog'

const App = () => {
    const [blogs, setBlogs] = useState([])

    const login = useSelector((state) => state.login)

    const dispatch = useDispatch()

    useEffect(() => {
        if (login.loggedIn === true) {
            blogService
                .getAll(localStorage.getItem('token'))
                .then((blogs) => dispatch({ type: 'SET_BLOGS', blogs: blogs }))
        }
    }, [login.loggedIn])

    return (
        <div>
            <Router>
                <div>
                    {login.loggedIn ? (
                        <div>
                            <Link to="/view-after-login">Blogs</Link>
                            <Link to="/users">Users</Link>
                        </div>
                    ) : null}
                </div>
                <div>
                    <Message />
                </div>
                <Routes>
                    <Route
                        path="/view-after-login"
                        element={
                            <ViewAfterLogin
                                blogs={blogs}
                                updateBlogs={setBlogs}
                            />
                        }
                    />
                    <Route path="/users/:id" element={<User />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/single-blog/:id" element={<Blog />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
