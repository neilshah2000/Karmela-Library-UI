const initialState = {
    sidebarShow: 'responsive'
}

export const uiReducer = (state = initialState, { type, ...rest }) => {
    switch (type) {
        case 'set':
            return {...state, ...rest }
        default:
            return state
    }
}