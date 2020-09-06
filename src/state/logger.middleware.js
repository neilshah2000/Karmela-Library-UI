export const logger = (store) => {
    return function(next) {
        return function(action) {
            console.log(action.type, action)
            let result = next(action);
            console.log('next state', store.getState())
            return result
        }
    }
}