import ActionTypes from "./actions/ActionTypes"

function reducer(state, { type, payload }) {
    switch (type) {
        case ActionTypes.SET_PIZZAS:
            return {...state, pizzas:payload}
        case ActionTypes.SET_INGREDIENTS:
            return {...state, ingredients:payload}
        case ActionTypes.SET_CONTENTS:
            return {...state, contents:payload}
        case ActionTypes.SET_USER:
            return {...state, name:payload.name, email:payload.email, cart:payload.cart}
        case ActionTypes.UPDATE_CART:
            return {...state, cart:payload}
        //storing order details temporarily before pushing it to database
        case ActionTypes.UPDATE_ORDER:
            return {...state, order: payload}
        case ActionTypes.SET_PIZZA:
            return {...state, pizza: payload}
        default:
            return state
    }
}

export default reducer