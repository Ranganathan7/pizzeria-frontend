import "./OrderPizza.css"
import { useDispatch, useSelector } from "react-redux"
import Pizza from "../Pizza/Pizza"
import { useEffect, useState } from "react"
import set_pizzas from "../../redux/actions/set_pizzas"
import axios from "axios"
import Loading from "../Loading/Loading"

function OrderPizza() {

    const dispatch = useDispatch()
    const pizzas = useSelector(state => state.pizzas)
    const [loading, setLoading] = useState(true)
    const base_url = useSelector(state => state.base_url)

    useEffect(() => {
        if(!pizzas) axios.get(base_url+'/pizzas').then(response => {
            if (response.data) dispatch(set_pizzas(response.data.data))
            else console.log(response.message)
            setTimeout(()=>setLoading(false), 1000)
        })
        else setLoading(false)
        // eslint-disable-next-line
    }, [])

    if(loading) return <Loading />

    return (
        <div className="pizza-container">
            <div className="row">
                {pizzas?.map(pizza => {
                    return <Pizza key={pizza.id} pizza={pizza} />
                })}
            </div>
        </div>
    )
}

export default OrderPizza