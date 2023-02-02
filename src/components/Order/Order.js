import "./Order.css"
import { useState } from "react"

function Order({ order, id }) {

    const [visible, setVisible] = useState(false)
    const [accordion_classes, setAccordion_classes] = useState("accordion-item-container")
    const [panel_classes, setPanel_classes] = useState("panel")

    function toggle_accordion() {
        setVisible(prev => !prev)
        if (!visible) {
            setAccordion_classes(prev => (prev + " active"))
            setPanel_classes(prev => (prev + " active-panel"))
        }
        else {
            setAccordion_classes("accordion-item-container")
            setPanel_classes("panel")
        }
    }

    return (
        <>
            <div className={accordion_classes} onClick={toggle_accordion}>
                <h4 className="accordion-header" id={id + "Heading"}>
                    <strong>ORDER #{id + 1}</strong>
                    <span className="position-absolute end-0" style={{ border: "none", margin: "0 2%" }}>
                        {!visible && <img src="/images/expand-arrow.png" height="30" width="30" alt="expand arrow" />}
                        {visible && <img src="/images/collapse-arrow.png" height="30" width="30" alt="collapse arrow" />}
                    </span>
                </h4>
            </div>

            <div className={panel_classes}>
                <div className="row grid justify-content-center">
                    <div className="col-8">
                        <table className="table table-striped-columns">
                            <thead>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Name</th>
                                    <td>{order.name}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Phone</th>
                                    <td>+91 {order.phone}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Address</th>
                                    <td>{order.address}</td>
                                </tr>
                                <tr>
                                    <th scope="row">City</th>
                                    <td>{order.city}</td>
                                </tr>
                                <tr>
                                    <th scope="row">PINCODE</th>
                                    <td>{order.pincode}</td>
                                </tr>
                                <tr>
                                    <th scope="row">TOTAL COST</th>
                                    <td><strong>Rs.</strong> {order.price}</td>
                                </tr>
                                <tr>
                                    <th scope="row">PAYMENT MODE</th>
                                    <td><strong>COD</strong> (cash on delivery)</td>
                                </tr>
                                <tr>
                                    <th scope="row">DATE & TIME</th>
                                    <td>{order.orderdate}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="order-table-container">
                    <table className="table table-striped" style={{ textAlign: "center" }}>
                        <thead>
                            <tr>
                                <th scope="col" colSpan="6"><h2>ORDERED ITEMS</h2></th>
                            </tr>
                            <tr className="table-success">
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Customization</th>
                                <th scope="col">Price/Item</th>
                                <th scope="col">Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                order.cart.map((each, num) => {
                                    return (
                                        <tr key={num}>
                                            <td><img style={{ height: "80px", width: "80px" }} src={each.image} alt={each.id} /></td>
                                            <td><p>{each.name}</p></td>
                                            <td><p>{each.quantity}</p></td>
                                            {each.toppings.length === 0 && <td>NIL</td>}
                                            {each.toppings.length !== 0 && <td>
                                                <table className="table table-bordered">
                                                    <tbody>
                                                        {each.toppings.map((topping, index) => {
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
                                            <td><p><strong>₹</strong> {each.price}</p></td>
                                            <td><p><strong>₹</strong> {each.price * each.quantity}</p></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {visible && <>
                <div className={accordion_classes} onClick={toggle_accordion}>
                    <h4 className="accordion-header" id={id + "Heading"}>
                        <strong>ORDER #{id + 1}</strong>
                        <span className="position-absolute end-0" style={{ border: "none", margin: "0 2%" }}>
                            {!visible && <img src="/images/expand-arrow.png" height="30" width="30" alt="expand arrow" />}
                            {visible && <img src="/images/collapse-arrow.png" height="30" width="30" alt="collapse arrow" />}
                        </span>
                    </h4>
                </div>
                <br />
            </>
            }
        </>
    )
}

export default Order