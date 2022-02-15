import { useState } from "react"
import { Col, Row } from "react-bootstrap"
import MainPosts from "./mainPosts"
import "../../styles/proHeader.css"
import MainProducts from "./mainProducts"
import MainReviews from "./mainReviews"


const ProMain = ({data}) => {

    const[ view, setView] = useState("posts")
        
          {
            if ( view === "posts"){
                return <MainPosts data={data} setView={setView}/>
            } else if ( view === "products") {
                 return <MainProducts setView={setView} data={data}/>
            } else {
                return <MainReviews setView={setView}/>
            }
         } 
        

}

export default ProMain