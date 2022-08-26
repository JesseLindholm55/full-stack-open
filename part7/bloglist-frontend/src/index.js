import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import messageReducer from './reducers/messageReducer'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import blogsReducer from './reducers/blogsReducer'
import loginReducer from './reducers/loginReducer'

const rootReducer = combineReducers({
    message: messageReducer,
    blogs: blogsReducer,
    login: loginReducer
})

const store = createStore(rootReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
