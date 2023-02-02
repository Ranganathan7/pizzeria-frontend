import "./Home.css"
import {useDispatch, useSelector} from "react-redux"
import set_contents from "../../redux/actions/set_contents"
import axios from "axios"
import {useEffect, useState} from "react"
import Loading from "../Loading/Loading"

function Home() {

    const content = useSelector(state => state.contents)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const base_url = useSelector(state => state.base_url)

    useEffect(() => {
        if(!content) axios.get(base_url+'/contents').then(response => {
            if (response.data) dispatch(set_contents(response.data.data[0]))
            else console.log(response.message)
            setTimeout(()=>setLoading(false), 1000)
        })
        else setLoading(false)
        // eslint-disable-next-line
    }, [])

    if(loading) return <Loading />

    return (
        <div className="home-container">

            <div className="row">
                <h1 className="center-content">Our Story</h1>
                {content && content.story?.map((para, index) => {
                    return <p key={index}>{para}</p>
                })}
            </div>

            <div className="row">
                <div className="col">
                    <img src="/images/ingredients.jpg" height="100%" width="100%" alt="ingredients" />
                </div>
                <div className="col align-content">
                    <h3>Ingredients</h3>
                    <p className="content-spacing">{content && content.ingredients}</p>
                </div>
            </div>

            <div className="row">
                <div className="col align-content">
                    <h3>Our Chefs</h3>
                    <p className="content-spacing">{content && content.chefs}</p>
                </div>
                <div className="col">
                    <img src="/images/chefs.jpg" height="100%" width="100%" alt="ingredients" />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <img src="/images/delivery.jpg" height="100%" width="100%" alt="ingredients" />
                </div>
                <div className="col align-content">
                    <h3 className="content-spacing">45 min delivery</h3>
                </div>
            </div>
        </div>
    )
}

export default Home