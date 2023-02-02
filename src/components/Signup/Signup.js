import "./Signup.css"
import {Link, useNavigate} from "react-router-dom"
import check_password from "./check_password"
import {useState, useEffect} from "react"
import validate from "./validate"
import axios from "axios"
import Loading from "../Loading/Loading"
import check_email from "./check_email"
import {useSelector} from "react-redux"

function Signup() {

    const navigate = useNavigate()
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [passwordFeedback, setPasswordFeedback] = useState([])
    const [emailFeedback, setEmailFeedback] = useState("")
    const [passwordMatch, setPasswordMatch] = useState("")
    const [loading, setLoading] = useState(false)
    const base_url = useSelector(state => state.base_url)

    useEffect(()=>{
        if(localStorage.loggedin==='true'){
            navigate("/home")
        }
        // eslint-disable-next-line
    }, [])

    function handleSignup(){
        setLoading(true)
        if(validate(name, email, password1, password2, passwordFeedback, emailFeedback)){
            axios.post(base_url+'/users', { name: name, email: email, password: password1 })
                .then(res => {
                    setLoading(false)
                    if (res.data.data !== undefined) {
                        alert("User Registered Successfully!")
                        navigate("/login")
                    }
                    else alert(res.data.message)
                })
                .catch(err => {
                    setLoading(false)
                    alert("Failed to connect to the server")
                })
        }
        else{
            setLoading(false)
            alert("Enter the required data correctly!")
        }
    }

    function handleNameChange(e){
        setName(e.target.value)
    }

    function handleEmailChange(e){
        setEmail(e.target.value.toLowerCase())
        setEmailFeedback(check_email(e.target.value))
    }

    function handlePassword1Change(e){
        setPassword1(e.target.value)
        setPasswordFeedback(check_password(e.target.value))
    }

    function handlePassword2Change(e){
        setPassword2(e.target.value)
        if(password1.localeCompare(e.target.value) !== 0) setPasswordMatch("Passwords Don't Match")
        else setPasswordMatch("")
    }

    if(loading) return <Loading />

    return (
        <div className="signup-container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col col-8">
                    <div className="card" style={{ borderRadius: "1rem" }}>
                        <div className="row g-0">
                            <div className="col-md-6 col-lg-5 d-none d-md-block">
                                <img src="/images/signup.jpg" alt="signup form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem"}} />
                            </div>
                            <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                <div className="card-body p-4 p-lg-5 text-black">
                                    <form>
                                        <h2 className="fw-normal mb-3 pb-3">Create your account</h2>
                                        <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                                            Already have an account? 
                                            <Link to="/login" style={{ color: "orange" }}>Login</Link>
                                        </p>
                                        <div className="form-outline mb-4">
                                            <input type="text" className="form-control form-control-lg" value={name} onChange={handleNameChange}/>
                                            <label className="form-label">Full Name</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="email" className="form-control form-control-lg" value={email} onChange={handleEmailChange}/>
                                            <label className="form-label">Email address</label>
                                            <p style={{color: "red"}}>{emailFeedback}</p>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input type="password" className="form-control form-control-lg" value={password1} onChange={handlePassword1Change}/>
                                            <label className="form-label">Create Password</label>
                                            <ul style={{color: "red"}}>
                                                {passwordFeedback?.map((feedback,id) => {
                                                    return <li key={id}>{feedback}</li>
                                                })}
                                            </ul>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input type="password" className="form-control form-control-lg" value={password2} onChange={handlePassword2Change}/>
                                            <label className="form-label">Confirm Password</label>
                                            <p style={{color: "red"}}>{passwordMatch}</p>
                                        </div>
                                        <div className="pt-1 mb-4">
                                            <button className="btn btn-dark btn-lg btn-block" type="button" onClick={handleSignup}>Sign up</button>
                                        </div>
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

export default Signup