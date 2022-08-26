import userService from '../../services/users'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const User = () => {
    const userId = useParams().id
    const [user, setUser] = useState(null)

    const getUser = () => {
        if (userId) {
            userService
                .getUserById(localStorage.getItem('token'), userId)
                .then((response) => {
                    setUser(response)
                })
        }
    }

    useEffect(getUser, [userId])

    return (
        <div>
            {user ? (
                <div>
                    <h3>{user.name}</h3>
                    <div>Added blogs</div>
                    <ul>
                        {user.blogs.map((blog) => (
                            <li key={blog.id}>{blog.title}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>No user found</div>
            )}
        </div>
    )
}

export default User
