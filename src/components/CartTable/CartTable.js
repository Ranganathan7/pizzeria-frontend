import {useNavigate} from "react-router-dom"
import Customize from "../Customize/Customize"
import {useDispatch} from "react-redux"
import set_pizza from "../../redux/actions/set_pizza"

function CartTable({pizza, addPizza, removePizza, subtractPizza}) {

    const value = pizza.quantity!==1?"visible":"invisible"
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleEdit(){
        dispatch(set_pizza(pizza))
        navigate("/build-ur-pizza")
    }

    return (
        <tr>
            <td><img style={{ height: "100px", width: "120px" }} src={pizza.image} alt={pizza.id} /></td>
            <td><p>{pizza.name}</p></td>
            <td>
                <button onClick={()=>subtractPizza(pizza)} className={"btn btn-sm "+value} style={{ margin: "5px" }}>
                    <img src="/images/minus.png" width="30" height="30" alt="cart" />
                    </button>
                    {pizza.quantity}
                    <button onClick={()=>addPizza(pizza)} className="btn btn-sm" style={{ margin: "5px" }}>
                    <img src="/images/add.png" width="30" height="30" alt="cart" />
                </button>
            </td>
            <td>
                <Customize pizza={pizza}/>
                <button style={{margin:"none", border:"none", backgroundColor:"transparent"}} onClick={handleEdit}>
                    <img src="/images/edit.png" width="40" height="40" alt="edit" />
                </button>
            </td>
            <td><p><strong>₹</strong> {pizza.price}</p></td>
            <td><p><strong>₹</strong> {pizza.price * pizza.quantity}</p></td>
            <td>
                <button onClick={() => removePizza(pizza)} className="btn btn-sm">
                    <img src="/images/delete.png" width="25" height="25" alt="cart" />
                </button>
            </td>
        </tr>
    )
}

export default CartTable