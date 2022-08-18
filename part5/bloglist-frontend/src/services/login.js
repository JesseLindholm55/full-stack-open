import axios from 'axios'
const baseUrl = '/api/login'

const login = async (givenUsername, givenPassword) => {
    try {
        let response = await axios.post(baseUrl, { username: givenUsername, password: givenPassword })
        if (response !== null) return response.data
    } catch (e) {
        return null
    }
}

export default { login }