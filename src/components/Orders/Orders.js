import "./Orders.css"
import {useState, useEffect} from "react"
import {useSelector} from "react-redux"
import EmptyCart from "../EmptyCart/EmptyCart"
import axios from "axios"
import Order from "../Order/Order"
import {useNavigate} from "react-router-dom"

function Orders() {
    const [orders, setOrders] = useState([])
    const name = useSelector(state => state.name)
    const navigate = useNavigate()
    const base_url = useSelector(state => state.base_url)

    useEffect(() => {

        if(localStorage.loggedin==='false'){
            navigate("/login")
        }

        axios.post(base_url+'/get-orders', {email: localStorage.email})
            .then((res) => {
                if(!res.data.data){
                    alert("mongoDB error")
                }
                else{
                    setOrders(res.data.data)
                }
            })
            .catch((err) => {
                alert("Error connecting to server!")
            })    
        // eslint-disable-next-line
    }, [])

    if (orders.length===0) {
        return (
            <EmptyCart />
        )
    }
    else {
        return (
            <div className="orders-container">
                <br />
                <h1 className="user-name-text">{name}s'   Orders</h1>
                <br />
                    {orders.map((order, num) => <Order order={order} key={num} id={num} />)}
            </div>
        )
    }
}

export default Orders