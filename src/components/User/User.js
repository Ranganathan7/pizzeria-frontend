import "./User.css"
import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useSelector } from "react-redux"

function User() {

    const navigate = useNavigate()
    const name = useSelector(state => state.name)
    const email = useSelector(state => state.email)

    useEffect(() => {
        if (localStorage.loggedin === 'false') {
            navigate("/login")
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div className="user-container-background">
            <div className="user-container">
                <div className="card text-center">
                    <div className="card-header">
                        <h3>Heya!!!</h3>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">{email}</p>
                        <button className="btn btn btn-primary cart-text position-relative user-cart-button" onClick={() => navigate("/my-cart")}>
                            <img src="/images/shopping-cart.png" width="30" height="30" alt="user" />
                            <b> My Cart</b>
                        </button>
                    </div>
                    <div className="card-footer text-muted">
                        <b><p>A <Link to="/order-pizza">Pizza</Link> slice a day keeps sadness away!</p></b>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User