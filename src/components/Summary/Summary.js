import { useNavigate, useOutletContext } from "react-router-dom"
import "./Summary.css"
import { useSelector } from "react-redux"
import { useEffect } from "react"

function Summary() {

    const { setValue } = useOutletContext()
    const cart = useSelector(state => state.cart)
    let tq = 0
    let tc = 0
    const navigate = useNavigate()

    useEffect(() => {
        if (cart && cart.length === 0) {
            navigate("/order-pizza")
        }
        // eslint-disable-next-line
    }, [])

    function back() {
        setValue("w-0")
        navigate("/my-cart")
    }

    function next() {
        localStorage.summary = true
        setValue("w-50")
        navigate("/checkout/address")
    }

    return (
        <>
            <div className="summary-container">
                <h1 style={{ fontFamily: "Lucida" }}>Order Summary</h1>
                <table className="table table-hover align-middle table-bordered">
                    <thead>
                        <tr className="table-dark">
                            <th scope="col"><h5>#</h5></th>
                            <th scope="col"><h5>Name</h5></th>
                            <th scope="col"><h5>Quantity</h5></th>
                            <th scope="col"><h5>Customization</h5></th>
                            <th scope="col"><h5>Price/Item</h5></th>
                            <th scope="col"><h5>Total Price</h5></th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            cart?.map((pizza) => {
                                tq = tq + pizza.quantity
                                tc = tc + (pizza.price * pizza.quantity)
                                return (
                                    <tr key={pizza.id}>
                                        <td><img src={pizza.image} alt={pizza.id} height="100" width="100" /></td>
                                        <td><p>{pizza.name}</p></td>
                                        <td>{pizza.quantity}</td>
                                        { pizza.toppings.length===0 && <td>NIL</td>} 
                                        { pizza.toppings.length!==0 && <td>
                                            <table className="table table-bordered">
                                                <tbody>
                                                    {pizza.toppings.map((topping, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td><img style={{ height: "40px", width: "40px" }} src={topping.image} alt={topping.name} /></td>
                                                                <td>{topping.name}</td>
                                                                <td><strong>₹</strong> {topping.price}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </td>}
                                        <td><p><strong>₹</strong> {pizza.price}</p></td>
                                        <td><p><strong>₹</strong> {pizza.price * pizza.quantity}</p></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td className="table-dark"><h5>Total quantity</h5></td>
                            <td className="table-warning"><h5><strong>{tq}</strong></h5></td>
                            <td></td>
                            <td className="table-dark"><h5>Total cost</h5></td>
                            <td className="table-warning"><h5><strong>₹ {tc}</strong></h5></td>
                        </tr>
                    </tfoot>
                </table>
                <button onClick={back} className="btn btn-warning left-button">
                    <img src="/images/shopping-cart.png" width="40" height="40" alt="cart" />
                    <img src="/images/back.png" height="40" width="40" alt="back" />
                </button>
                <button onClick={next} className="btn btn-primary">
                    <img src="/images/next.png" height="40" width="40" alt="next" />
                </button>
            </div>
        </>
    )
}

export default Summary