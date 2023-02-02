import "./Login.css"
import {Link, useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Loading from "../Loading/Loading"
import set_user from "../../redux/actions/set_user"
import {useDispatch, useSelector} from "react-redux"

function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const base_url = useSelector(state => state.base_url)

    useEffect(()=>{
        if(localStorage.loggedin==='true'){
            navigate("/home")
        }
        // eslint-disable-next-line
    }, [])
    
    function handleLogin(){
        setLoading(true)
        axios.post(base_url+'/login', { email: email, password: password })
                .then(res => {
                    setLoading(false)
                    if (res.data.data !== undefined) {
                        localStorage.loggedin = true
                        localStorage.name = res.data.data.name
                        localStorage.email = res.data.data.email
                        dispatch(set_user({name:res.data.data.name, email:res.data.data.email, cart:res.data.data.cart}))
                        navigate("/home")
                    }
                    else alert(res.data.message)
                })
                .catch(err => {
                    setLoading(false)
                    // console.log(err)
                    alert("Invalid Credentials")
                })
    }

    function handlePasswordChange(e){
        setPassword(e.target.value)
    }

    function handleEmailChange(e){
        setEmail(e.target.value)
    }

    if(loading) return <Loading />

    return (
        <div className="login-container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-8">
                    <div className="card" style={{ borderRadius: "1rem" }}>
                        <div className="row g-0">
                            <div className="col-md-6 col-lg-5 d-none d-md-block">
                                <img src="/images/login.jpg" alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem", height: "100%" }} />
                            </div>
                            <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                <div className="card-body p-4 p-lg-5 text-black">

                                    <form>
                                        <h2 className="fw-normal mb-3 pb-3">Sign into your account</h2>
                                        <div className="form-outline mb-4">
                                            <input type="email" className="form-control form-control-lg" value={email} onChange={handleEmailChange}/>
                                            <label className="form-label">Email address</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="password" className="form-control form-control-lg" alue={password} onChange={handlePasswordChange}/>
                                            <label className="form-label">Password</label>
                                        </div>

                                        <div className="pt-1 mb-4">
                                            <button className="btn btn-dark btn-lg btn-block" type="button" onClick={handleLogin}>Login</button>
                                        </div>

                                        <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                                            Don't have an account? 
                                            <Link to="/signup" style={{ color: "orange" }}>Register here</Link>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login