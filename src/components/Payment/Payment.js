import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useOutletContext } from "react-router-dom"
import axios from "axios"
import update_order from "../../redux/actions/update_order"
import update_cart from "../../redux/actions/update_cart"
import "./Payment.css"
import { useEffect } from "react"


function Payment() {

    const navigate = useNavigate()
    const requestobj = useSelector(state => state.order)
    const { setValue } = useOutletContext()
    const dispatch = useDispatch()
    const email = useSelector(state => state.email)
    const base_url = useSelector(state => state.base_url)

    useEffect(() => {
        if (!requestobj) {
            navigate("/my-cart")
        }
        // eslint-disable-next-line
    }, [])

    function back() {
        setValue("w-50")
        navigate("/checkout/address")
    }

    function next() {
        localStorage.summary = false
        placeOrder()
    }

    function placeOrder() {
        requestobj.orderdate = new Date()
        axios.post(base_url+'/orders', { order: requestobj, email: email })
            .then(res => {
                if (!res.data.data) {
                    alert("MongoDB error!")
                }
                else {
                    dispatch(update_order({}))
                    dispatch(update_cart([]))
                    alert("Pizzas are on the way!!!")
                    navigate("/my-orders")
                    axios.post(base_url+'/empty-cart', { email: email })
                        .catch(error => {
                            alert("Having trouble connecting to server!")
                        })
                }
            })
            .catch(err => {
                alert("Having trouble connecting to server!")
            })
    }

    if (requestobj) {
        return (
            <div className="order-details-container">
                <h1 style={{ fontFamily: "Lucida", textAlign: "center" }}>Order Details</h1>
                <br />
                <div className="row grid justify-content-center">
                    <div className="col-8">
                        <table className="table table-striped-columns">
                            <thead>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Name</th>
                                    <td>{requestobj.name}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Phone</th>
                                    <td>+91 {requestobj.phone}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Address</th>
                                    <td>{requestobj.address}</td>
                                </tr>
                                <tr>
                                    <th scope="row">State</th>
                                    <td>{requestobj.state}</td>
                                </tr>
                                <tr>
                                    <th scope="row">City</th>
                                    <td>{requestobj.city}</td>
                                </tr>
                                <tr>
                                    <th scope="row">PINCODE</th>
                                    <td>{requestobj.pincode}</td>
                                </tr>
                                <tr>
                                    <th scope="row">TOTAL COST</th>
                                    <td><strong>Rs.</strong> {requestobj.price}</td>
                                </tr>
                                <tr>
                                    <th scope="row">PAYMENT MODE</th>
                                    <td><strong>COD</strong> (cash on delivery)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div style={{ textAlign: "center" }}>
                    <button onClick={back} className="btn btn-warning left-button-payment">
                        <img src="/images/back.png" height="40" width="40" alt="back" />
                    </button>
                    <button onClick={next} className="btn btn-primary">
                        <img src="/images/place_order.png" height="40" width="40" alt="next" />
                    </button>
                </div>
            </div>
        )
    }
    else {
        navigate("/my-cart")
    }
}

export default Payment