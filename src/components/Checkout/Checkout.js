import { useEffect, useState } from "react"
import { useNavigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

function CheckOut() {

    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const [value, setValue] = useState("w-25")

    useEffect(() => {
        if (localStorage.loggedin === 'false') {
            navigate("/login")
        }
        if(cart){
            if(cart.length===0) navigate("/order-pizza")
        }
        else{
            navigate("/order-pizza")
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div className="progress">
                <div className={"progress-bar " + value}></div>
            </div>
            <Outlet context={{ setValue: setValue }} />
        </>
    )
}

export default CheckOut