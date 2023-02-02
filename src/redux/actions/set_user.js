import ActionTypes from './ActionTypes'

function set_user(user) {
    
    return {
        type: ActionTypes.SET_USER,
        payload: user
    }
}

export default set_user