import { useNavigate, Link } from "react-router-dom"
import set_user from "../../redux/actions/set_user"
import { useDispatch, useSelector } from "react-redux"
import "./Navbar.css"

function Navbar() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loggedin = useSelector(state => state.name !== undefined ? localStorage.loggedin : false)
    const cart = useSelector(state => state.cart)
    let tq = 0
    cart?.map((each) => {
        tq = tq + each.quantity
        return each
    })

    function handleCart() {
        navigate("/my-cart")
    }

    function handleLogin() {
        navigate("/login")
    }

    function handleSignup() {
        navigate("/signup")
    }

    function handleLogout() {
        localStorage.clear()
        localStorage.loggedin = false
        dispatch(set_user({}))
        navigate("/home")
    }

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{fontSize:"28x"}}><b>Pizzeria</b></Link>
                <Link className="navbar-brand" to="/">
                    <img src="/images/PizzeriaLogo.png" alt="Logo" width="70" height="50" className="d-inline-block align-text-top" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link" to="/order-pizza">Order Pizza</Link>
                        <Link className="nav-link" to="/build-ur-pizza">Build Ur Pizza</Link>
                        {loggedin && <Link className="nav-link" to="/my-orders">My Orders</Link>}
                    </div>
                    <div className="right-edge-buttons">
                    {loggedin &&
                            <button className="btn btn btn-dark cart-text position-relative" onClick={()=>navigate("/user")}>
                                <img src="/images/user.png" width="50" height="50" alt="cart" />
                            </button>
                        }
                        {loggedin &&
                            <button className="btn btn btn-warning cart-text position-relative" onClick={handleCart}>
                                <img src="/images/shopping-cart.png" width="30" height="30" alt="cart" />
                                <b> Shopping Cart</b>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{tq}</span>
                            </button>
                        }
                        {loggedin &&
                            <button className="btn btn btn-danger cart-text" onClick={handleLogout}>
                                <img src="/images/logout.png" width="30" height="30" alt="logout" />
                                <b> Log Out</b>
                            </button>
                        }
                        {!loggedin &&
                            <button className="btn btn btn-warning cart-text" onClick={handleSignup}>
                                <img src="/images/signup.png" width="30" height="30" alt="signup" />
                                <b> Sign Up</b>
                            </button>
                        }
                        {!loggedin &&
                            <button className="btn btn btn-primary cart-text" onClick={handleLogin}>
                                <img src="/images/login.png" width="30" height="30" alt="login" />
                                <b> Log In</b>
                            </button>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar