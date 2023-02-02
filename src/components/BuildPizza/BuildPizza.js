import "./BuildPizza.css"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import set_ingredients from "../../redux/actions/set_ingredients"
import axios from "axios"
import Loading from "../Loading/Loading"
import { useNavigate } from "react-router-dom"
import update_cart from "../../redux/actions/update_cart"
import set_pizza from "../../redux/actions/set_pizza"

function BuildPizza() {

    const ingredients = useSelector(state => state.ingredients)
    const [totalCost, setTotalCost] = useState(0)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [selectedIngredients, setSelectedIngredients] = useState([])
    const email = useSelector(state => state.email)
    const base_url = useSelector(state => state.base_url)
    const pizza = useSelector(state => state.pizza)

    useEffect(() => {
        if (!ingredients) axios.get(base_url + '/ingredients').then(response => {
            if (response.data) dispatch(set_ingredients(response.data.data))
            else console.log(response.message)
            setTimeout(() => setLoading(false), 1000)
        })
        else setLoading(false)
        return (() => {
            dispatch(set_pizza({}))
        })
        // eslint-disable-next-line
    }, [])

    function handleBuild() {
        if (localStorage.loggedin === 'false') {
            navigate("/login")
        }
        else if (!pizza || !pizza.id) {
            alert("Pick a pizza to customize from your cart!")
            navigate("/my-cart")
        }
        else {
            if (selectedIngredients.length > 0) {
                axios.post(base_url + '/update-cart/toppings', { email: email, pizza: pizza, action: 1, toppings: selectedIngredients })
                    .then(res => {
                        if (res.data.data !== undefined) {
                            // alert(res.data.data)
                            axios.post(base_url + '/cart', { email: email })
                                .then(res => {
                                    if (res.data.data !== undefined) {
                                        dispatch(update_cart(res.data.data))
                                        alert("Added to cart!")
                                        navigate("/my-cart")
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
        }
    }

    function handleCheckBox(e, ingredient) {
        if (e.target.checked) {
            setTotalCost(prevTotalCost => prevTotalCost + ingredient.price)
            setSelectedIngredients(current => ([...current, ingredient]))
        }
        else {
            setTotalCost(prevTotalCost => prevTotalCost - ingredient.price)
            const index = selectedIngredients.indexOf(ingredient)
            setSelectedIngredients(current => current.splice(index, 1))
        }
    }

    if (loading) return <Loading />

    return (
        <div className="ingredients-container">
            <p style={{ textAlign: "center" }}>
                Pizzeria now gives you options to build your own pizza. Customize your pizza by choosing ingredients from the list given below
            </p>
            <div className="ingredients-table">
                <table className="table table-striped table-bordered" style={{ textAlign: "center" }}>
                    <tbody>
                        {ingredients?.map(ingredient => {
                            return (
                                <tr key={ingredient.id}>
                                    <td><img src={ingredient.image} height="80px" width="80px" alt={ingredient.tname} /></td>
                                    <td><b>{ingredient.tname}</b></td>
                                    <td><b>₹{parseInt(ingredient.price).toFixed(2)}</b></td>
                                    <td><input onChange={(e) => handleCheckBox(e, ingredient)} type="checkbox" />
                                        <b><span style={{ color: "orange" }}> Add</span></b>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className="sticky-bottom" style={{ backgroundColor: "white" }}>
                <span className="cost-text"><b><span style={{ color: "blue" }}>Total Cost : </span>
                    <span style={{ fontSize: "23px" }}>₹{totalCost}</span></b></span>
                <button className="btn btn-lg btn-dark build-button" onClick={handleBuild}><b>Build Ur Pizza</b></button>
            </div>
        </div>
    )
}

export default BuildPizza