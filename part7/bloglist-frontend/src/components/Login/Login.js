import { useState } from 'react'
import { useDispatch } from 'react-redux'
import login from '../../services/login'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const dispatch = useDispatch()

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const loginFunction = async () => {
        let response = await login.login(username, password)
        if (response !== null) {
            window.localStorage.setItem('token', response.token)
            dispatch({
                type: 'LOG_IN',
                login: { loggedIn: true, user: response }
            })
            dispatch({
                type: 'CHANGE_MESSAGE',
                message: { content: 'Successful login', error: false }
            })
            navigate('/view-after-login')
        } else {
            dispatch({
                type: 'CHANGE_MESSAGE',
                message: {
                    content: 'Wrong username or password',
                    error: true
                }
            })
        }
    }

    return (
        <div style={{ margin: 'auto', width: 'fit-content' }}>
            <div
                style={{
                    fontWeight: 'bold',
                    margin: 'auto',
                    width: 'max-content',
                    fontSize: '25px',
                    marginBottom: '5px'
                }}
            >
                Log in to application
            </div>
            <div>
                <span>Username:</span>
                <input
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </div>
            <div style={{ marginTop: '5px' }}>
                <span>Password:</span>
                <input
                    id="password"
                    style={{ marginLeft: '3px' }}
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <button
                id="login"
                style={{ float: 'right', marginTop: '5px' }}
                type="button"
                onClick={loginFunction}
            >
                Login
            </button>
        </div>
    )
}
export default Login
