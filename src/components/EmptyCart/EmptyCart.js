import {Link} from 'react-router-dom'

function EmptyCart(){

    return (
        <div className="container" style={{textAlign: "center", color: "orange", marginTop: "100px"}}>
            <img src="/images/empty_cart.gif" style={{width:"50%", height: "50%"}} className="image-fluid" alt="empty cart"></img>
            <h1>If at first you dont succeed, <Link to="/order-pizza">Order Pizza</Link></h1>
            <br />
        </div>
    )
}

export default EmptyCart