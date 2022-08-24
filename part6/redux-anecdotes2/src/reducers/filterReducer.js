const filter = ''

const filterReducer = (state = filter, action) => {
    switch (action.type) {
        case 'CHANGE_FILTER':
            const newFilter = action.value
            return newFilter
    
        default:
            return filter
    }
}  

export default filterReducer