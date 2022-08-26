const message = { content: null, error: false }

const messageReducer = (state = message, action) => {
    switch (action.type) {
        case 'CHANGE_MESSAGE':
            const newMessage = action.message
            return newMessage

        default:
            return state
    }
}

export default messageReducer
