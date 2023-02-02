import ActionTypes from './ActionTypes'

function set_pizza(pizza) {
    
    return {
        type: ActionTypes.SET_PIZZA,
        payload: pizza
    }
}

export default set_pizza