import { useDispatch, useSelector } from 'react-redux'
import UserInformation from '../UserInformation/UserInformation'
import usersService from '../../services/users'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Users = () => {
    const login = useSelector((state) => state.login)
    const dispatch = useDispatch()
    const [users, setUsers] = useState(null)
    const navigate = useNavigate()

    const getUsers = () => {
        if (login.loggedIn === true) {
            usersService.getUsers(localStorage.getItem('token')).then(
                (response) => {
                    console.log(response)
                    setUsers(response)
                    dispatch({
                        type: 'CHANGE_MESSAGE',
                        message: { content: 'Users retrieved', error: false }
                    })
                },
                (error) =>
                    dispatch({
                        type: 'CHANGE_MESSAGE',
                        message: {
                            content: 'Error with fetching users',
                            error: true
                        }
                    })
            )
        }
    }

    useEffect(getUsers, [login])

    const navigateToUser = (id) => {
        navigate(`/users/${id}`)
    }

    return (
        <div>
            <UserInformation />
            {login.loggedIn && users ? (
                <div>
                    <h2>Users</h2>
                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                        <div style={{ flexDirection: 'column' }}>
                            <div style={{ fontWeight: 'bold' }}>User name:</div>
                            {users.map((user) => (
                                <a
                                    onClick={() => {
                                        navigateToUser(user.id)
                                    }}
                                >
                                    <div>{user.name}</div>
                                </a>
                            ))}
                        </div>
                        <div
                            style={{
                                flexDirection: 'column',
                                marginLeft: '10px'
                            }}
                        >
                            <div style={{ fontWeight: 'bold' }}>
                                Blogs count:
                            </div>
                            {users.map((user) => (
                                <div>{user.blogs.length}</div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default Users
