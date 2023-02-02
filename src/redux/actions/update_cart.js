import ActionTypes from './ActionTypes'

function update_cart(cart) {
    
    return {
        type: ActionTypes.UPDATE_CART,
        payload: cart
    }
}

export default update_cart