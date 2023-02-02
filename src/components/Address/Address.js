import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useOutletContext } from "react-router-dom"
import "./Address.css"
import update_order from "../../redux/actions/update_order"

function Address() {

    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const { setValue } = useOutletContext()
    const name = useSelector(state => state.name)
    const [requestobj, setRequestobj] = useState({ phone: "", city: "", state: "", price: 0, name: name, cart: [], address: "", pincode: "" })

    useEffect(() => {
        if (cart && cart.length === 0) {
            navigate("/order-pizza")
        }
        if (localStorage.summary && localStorage.summary === 'false') {
            setValue("w-25")
            navigate("/checkout/summary")
        }
        setPrice()
        setCart()
        // eslint-disable-next-line
    }, [])

    function back() {
        localStorage.summary = false
        setValue("w-25")
        navigate("/checkout/summary")
    }

    function next() {
        if (handleSubmit()) {
            setValue("w-75")
            navigate("/checkout/payment")
        }
    }

    function setName(e) {
        setRequestobj((prev) => ({ ...prev, name: e.target.value }))
    }

    function setPhone(e) {
        setRequestobj((prev) => ({ ...prev, phone: e.target.value }))
    }

    function setAddress(e) {
        setRequestobj((prev) => ({ ...prev, address: e.target.value }))
    }

    function setCity(e) {
        setRequestobj((prev) => ({ ...prev, city: e.target.value }))
    }

    function setState(e) {
        setRequestobj((prev) => ({ ...prev, state: e.target.value }))
    }

    function setPincode(e) {
        setRequestobj((prev) => ({ ...prev, pincode: e.target.value }))
    }

    function setCart() {
        setRequestobj((prev) => ({ ...prev, cart: cart }))
    }

    function setPrice() {
        let tc = 0
        cart?.forEach(each => {
            tc = tc + (each.price * each.quantity)
            return each
        })
        setRequestobj((prev) => ({ ...prev, price: tc }))
    }

    function handleSubmit() {
        if (requestobj.phone.length > 0 && requestobj.name.length > 0 && requestobj.address.length > 0 && requestobj.state.length > 0 && requestobj.city.length > 0 && requestobj.pincode.length > 0) {
            dispatch(update_order(requestobj))
            alert("data updated, proceed for payment")
            return true
        }
        else {
            alert("Please fill all the fields in the below form")
            return false
        }
    }

    return (
        <div className="address-container">
            <div className="row grid justify-content-center">
                <h1 style={{ fontFamily: "Lucida", textAlign: "center" }}>Delivery Address Details</h1>

                <form className="row g-3 col-8" style={{textAlign:"left"}}>
                    <div className="col-md-6">
                        <label className="form-label">Name</label>
                        <input onChange={setName} value={requestobj.name} type="text" className="form-control" required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Phone</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text">+91</span>
                            <input onChange={setPhone} value={requestobj.phone} type="number" className="form-control" required />
                        </div>
                    </div>
                    <div className="col-12">
                        <label className="form-label">Address</label>
                        <input onChange={setAddress} value={requestobj.address} type="text" className="form-control" required />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">State</label>
                        <input onChange={setState} value={requestobj.state} type="text" className="form-control" required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">City</label>
                        <input onChange={setCity} value={requestobj.city} type="text" className="form-control" required />
                    </div>
                    <div className="col-md-2">
                        <label className="form-label">Zip</label>
                        <input onChange={setPincode} value={requestobj.pincode} type="number" className="form-control" required />
                    </div>
                </form>
                
            </div>
            <button onClick={back} className="btn btn-warning left-button-address">
                <img src="/images/back.png" height="40" width="40" alt="back" />
            </button>
            <button onClick={next} className="btn btn-primary">
                <img src="/images/next.png" height="40" width="40" alt="next" />
            </button>
        </div>
    )

}

export default Address