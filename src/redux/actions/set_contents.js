import ActionTypes from './ActionTypes'

function set_contents(contents) {
    
    return {
        type: ActionTypes.SET_CONTENTS,
        payload: contents
    }
}

export default set_contents