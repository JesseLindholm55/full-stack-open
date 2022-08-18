import { useState, useEffect } from 'react'
import Login from './components/Login/Login'
import blogService from './services/blogs'
import userService from './services/users'
import ViewAfterLogin from './components/ViewAfterLogin/ViewAfterLogin'
import Message from './components/Message/Message'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [loggedIn, setLoggedIn] = useState(false)
    const [loginName, setLoginName] = useState('')
    const [userName, setUserName] = useState('')
    const [message, setMessage] = useState({ content: '', error: false })

    useEffect(() => {

        if (loggedIn === true) {
            userService.getUsers(localStorage.getItem('token')).then(users => {
                for (let i = 0; i < users.length; i++) {
                    const element = users[i]
                    if (element.username === loginName) setUserName(element.name)
                }
            })

            blogService.getAll(localStorage.getItem('token')).then(blogs =>
                setBlogs( blogs )
            )
        }
    }, [loggedIn])

    return (
        <div>
            <Message message={message}/>
            {!loggedIn ? <Login updateLoggedIn={setLoggedIn} updateLoginName={setLoginName} updateMessage={setMessage} /> :
                <ViewAfterLogin userName={userName} blogs={blogs} updateLoggedInView={setLoggedIn} updateBlogs={setBlogs} updateMessage={setMessage}/>
            }
        </div>
    )
}

export default App
