import ActionTypes from './ActionTypes'

function set_ingredients(ingredients) {
    
    return {
        type: ActionTypes.SET_INGREDIENTS,
        payload: ingredients
    }
}

export default set_ingredients