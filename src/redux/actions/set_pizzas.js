import ActionTypes from './ActionTypes'

function set_pizzas(pizzas) {
    
    return {
        type: ActionTypes.SET_PIZZAS,
        payload: pizzas
    }
}

export default set_pizzas