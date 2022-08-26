import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UserInformation = () => {
    const login = useSelector((state) => state.login)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = () => {
        dispatch({ type: 'LOG_OUT' })
        dispatch({
            type: 'CHANGE_MESSAGE',
            message: { content: 'User logged out', error: false }
        })
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div>
            {login.loggedIn ? (
                <div>
                    <h2 style={{ fontWeight: 'bold' }}>User information</h2>
                    <div>
                        <span>{login.user.name} is logged in.</span>
                        <button
                            type="button"
                            style={{ marginLeft: '5px' }}
                            onClick={logout}
                        >
                            Log out
                        </button>
                    </div>
                </div>
            ) : (
                <div>Not logged in</div>
            )}
        </div>
    )
}

export default UserInformation
