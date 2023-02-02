import Navbar from "./components/Navbar/Navbar"
import PageNotFound from "./components/PageNotFound/PageNotFound"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./components/Home/Home"
import Footer from "./components/Footer/Footer"
import OrderPizza from "./components/OrderPizza/OrderPizza"
import BuildPizza from "./components/BuildPizza/BuildPizza"
import Loading from "./components/Loading/Loading"
import Signup from "./components/Signup/Signup"
import Login from "./components/Login/Login"
import {useDispatch, useSelector} from "react-redux"
import set_user from "./redux/actions/set_user"
import {useEffect} from "react"
import Cart from "./components/Cart/Cart"
import axios from "axios"
import update_cart from "./redux/actions/update_cart"
import Orders from "./components/Orders/Orders"
import CheckOut from "./components/Checkout/Checkout"
import Address from "./components/Address/Address"
import Summary from "./components/Summary/Summary"
import Payment from "./components/Payment/Payment"
import User from "./components/User/User"

function App() {

  const dispatch = useDispatch()
  const base_url = useSelector(state => state.base_url)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)

  function setWindowDimensions() {
    setWindowWidth(window.innerWidth)
    setWindowHeight(window.innerHeight)
  }

  useEffect(()=>{
    window.addEventListener('resize', setWindowDimensions)

    if(localStorage.loggedin==='true'){
        dispatch(set_user({name:localStorage.name, email:localStorage.email}))
        axios.post(base_url+'/cart', { email: localStorage.email})
            .then(res => {
                if (res.data.data !== undefined) {
                    dispatch(update_cart(res.data.data))
                }
                else alert(res.data.message)
            })
            .catch(err => {
                // console.log(err)
                alert("Error connecting to server!")
            })
    }

    return(() => {
      window.addEventListener('resize', setWindowDimensions)
    })
    // eslint-disable-next-line
}, [])

  if(window.innerWidth > 1200 && window.innerHeight > 450) return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/order-pizza" element={<OrderPizza />} />
          <Route path="/build-ur-pizza" element={<BuildPizza />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my-cart" element={<Cart />} />
          <Route path="/my-orders" element={<Orders />} />
          <Route path="/checkout" element={<CheckOut />}>
            <Route path="" element={<Summary />} />
            <Route path="summary" element={<Summary />} />
            <Route path="address" element={<Address />} />
            <Route path="payment" element={<Payment />} />
          </Route>
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  )

  else return (
    <MobileApp />
  )
}

export default App;
