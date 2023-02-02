import "./Cart.css"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CartTable from "../CartTable/CartTable"
import { useSelector, useDispatch } from "react-redux"
import EmptyCart from "../EmptyCart/EmptyCart"
import axios from "axios"
import update_cart from "../../redux/actions/update_cart"

function Cart() {

    const navigate = useNavigate()
    const user_name = useSelector(state => state.name)
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const email = useSelector(state => state.email)
    const base_url = useSelector(state => state.base_url)
    let tq = 0
    let tc = 0

    useEffect(() => {
        if (localStorage.loggedin === 'false') {
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [])

    function updateCart(pizza, action) {
        const cart_pizza = {
            id: pizza.id,
            type: pizza.type,
            price: pizza.price,
            name: pizza.name,
            image: pizza.image
        }
        axios.post(base_url + '/update-cart', { email: email, pizza: cart_pizza, action: action })
            .then(res => {
                if (res.data.data !== undefined) {
                    // alert(res.data.data)
                    axios.post(base_url + '/cart', { email: email })
                        .then(res => {
                            if (res.data.data !== undefined) {
                                dispatch(update_cart(res.data.data))
                            }
                            else console.log(res.data.message)
                        })
                        .catch(err => {
                            // console.log(err)
                            console.log("Error connecting to server!")
                        })
                }
                else console.log(res.data.message)
            })
            .catch(err => {
                // console.log(err)
                alert("Error connecting to server!")
            })
    }

    function addPizza(pizza) {
        updateCart(pizza, 1)
    }

    function subtractPizza(pizza) {
        updateCart(pizza, -1)
    }

    function removePizza(pizza) {
        updateCart(pizza, 0)
    }

    if (cart === undefined || cart.length === 0) return <EmptyCart />

    return (
        <div className="cart-container">
            <span className="user-name-text">{user_name}s'  Cart</span>
            <button onClick={() => navigate("/order-pizza")} className="btn btn-info rounded-pill add-more">
                <h6>Add More <img src="/images/add_pizza.png" width="30" height="30" alt="cart" /></h6>
            </button>
            <div className="cart-table-container">
                <table className="table table-hover table-bordered align-middle" style={{ textAlign: "center" }}>
                    <thead>
                        <tr className="table-secondary">
                            <th scope="col"><h5>#</h5></th>
                            <th scope="col"><h5>Name</h5></th>
                            <th scope="col"><h5>Quantity</h5></th>
                            <th scope="col"><h5>Customize</h5></th>
                            <th scope="col"><h5>Price/Item</h5></th>
                            <th scope="col"><h5>Total Price</h5></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart?.map((each) => {
                                tq = tq + each.quantity
                                tc = tc + (each.price * each.quantity)
                                return <CartTable pizza={each} addPizza={addPizza} subtractPizza={subtractPizza} removePizza={removePizza} key={each.id} />
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td className="table-dark"><h5>Total quantity</h5></td>
                            <td className="table-info"><h5><strong>{tq}</strong></h5></td>
                            <td></td>
                            <td className="table-dark"><h5>Total cost</h5></td>
                            <td className="table-info"><h5><strong>₹ {tc}</strong></h5></td>
                            <td className="table-warning checkout-button">
                                <button onClick={() => navigate("/checkout")} className="btn btn-lg">
                                    <b>CHECK OUT</b>
                                    <img src="/images/checkout.png" width="50" height="40" alt="cart" />
                                </button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default Cart