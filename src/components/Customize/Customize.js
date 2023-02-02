import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import update_cart from "../../redux/actions/update_cart"

function Customize({ pizza }) {

    const dispatch = useDispatch()
    const email = useSelector(state => state.email)
    const base_url = useSelector(state => state.base_url)

    function removeTopping(topping) {
        axios.post(base_url + '/update-cart/toppings', { email: email, pizza: pizza, action: 0, toppings: topping })
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
                console.log("Error connecting to server!")
            })
    }

return (
    <div>
        <table className="table table-bordered">
            <tbody>
                {pizza.toppings.map((topping, index) => {
                    return (
                        <tr key={index}>
                            <td><img style={{ height: "50px", width: "50px" }} src={topping.image} alt={topping.name} /></td>
                            <td>{topping.name}</td>
                            <td><strong>₹</strong> {topping.price}</td>
                            <td>
                                <button onClick={() => removeTopping(topping)} className="btn btn-sm">
                                    <img src="/images/delete.png" width="20" height="20" alt="cart" />
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
)
}

export default Customize