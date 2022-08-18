import { useState } from 'react'
import login from '../../services/login'

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const loginFunction = async  () => {
        let response = await login.login(username, password)
        if (response !== null) {
            window.localStorage.setItem('token', response.token)
            props.updateLoginName(response.username)
            props.updateLoggedIn(true)
            props.updateMessage({ content: 'Successful login', error: false })
        } else {
            props.updateMessage({ content: 'Wrong username or password', error: true })
        }
    }

    return (
        <div style={{ margin: 'auto', width: 'fit-content' }}>
            <div style={{ fontWeight: 'bold', margin: 'auto', width: 'max-content', fontSize: '25px', marginBottom: '5px' }}>Log in to application</div>
            <div>
                <span>Username:</span>
                <input id="username" value={username} onChange={handleUsernameChange}/>
            </div>
            <div style={{ marginTop: '5px' }}>
                <span>Password:</span>
                <input id="password" style={{ marginLeft: '3px' }} type="password" value={password} onChange={handlePasswordChange}/>
            </div>
            <button id="login" style={{ float: 'right', marginTop: '5px' }} type='button' onClick={loginFunction}>Login</button>
        </div>
    )
}
export default Login