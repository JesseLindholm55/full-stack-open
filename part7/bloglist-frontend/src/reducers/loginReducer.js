const login = { loggedIn: false, user: null }

const loginReducer = (state = login, action) => {
    switch (action.type) {
        case 'LOG_IN':
            const newLogin = action.login
            return newLogin

        case 'LOG_OUT':
            return { loggedIn: false, user: null }

        default:
            return state
    }
}

export default loginReducer
