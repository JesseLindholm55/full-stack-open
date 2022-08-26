import axios from 'axios'
const baseUrl = '/api/users'

const getUsers = (token) => {
    const request = axios.get(baseUrl, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return request.then((response) => response.data)
}

const getUserById = (token, id) => {
    const request = axios.get(baseUrl + '/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return request.then((response) => response.data)
}

const exports = { getUsers, getUserById }

export default exports
