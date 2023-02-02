import ActionTypes from './ActionTypes'

function update_order(order) {
    
    return {
        type: ActionTypes.UPDATE_ORDER,
        payload: order
    }
}

export default update_order