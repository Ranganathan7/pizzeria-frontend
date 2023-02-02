import "./Pizza.css"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import update_cart from "../../redux/actions/update_cart"
import { useNavigate } from "react-router-dom"

function Pizza({ pizza }) {

    const dispatch = useDispatch()
    const email = useSelector(state => state.email)
    const navigate = useNavigate()
    const base_url = useSelector(state => state.base_url)

    function handleCart() {
        HandleCart(pizza)
    }

    function HandleCart(pizza) {
        if (localStorage.loggedin === 'false') {
            navigate("/login")
        }
        else {
            const cart_pizza = {
                id: (pizza.id+Math.random()),
                type: pizza.type,
                price: parseInt(pizza.price),
                name: pizza.name,
                image: pizza.image
            }
            axios.post(base_url + '/add-to-cart', { email: email, pizza: cart_pizza })
                .then(res => {
                    if (res.data.data !== undefined) {
                        alert(res.data.data)
                        navigate("/my-cart")
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
    }

    return (
        <div className="col-6 pizza-box">
            <div className="row">
                <div className="col-2 pizza-name">
                    <h5>{pizza.name}</h5>
                    <div className="pizza-type" style={{ backgroundColor: pizza.type === "veg" ? "green" : "red" }}></div>
                    <div className="pizza-price">
                        <h5>₹{parseInt(pizza.price).toFixed(2)}</h5>
                    </div>
                </div>
                <div className="col-6 pizza-description">
                    <p>{pizza.description}</p>
                    <p><b>Ingredients: </b>{pizza.ingredients.join(',')}</p>
                    <p><b>Toppings: </b>{pizza.topping.join(',')}</p>
                </div>
                <div className="col-4 pizza-image">
                    <img src={pizza.image} alt={pizza.name} height="150px" width="150px" />
                    <button className="btn btn-warning cart-button" onClick={handleCart}>
                        <b>Add to Cart</b>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Pizza