import { useState } from "react"
import MainProducts from "../proView/mainProducts"
import MainUpComingBookings from "./mainUpComingBookings"
import MainUserProducts from "./mainUserProducts"

const NormalMain = ({data}) => {
    const[ view, setView] = useState("products")
        
          {
            if ( view === "bookings"){
                return <MainUpComingBookings setView={setView}/>
            } else if ( view === "products") {
                 return <MainUserProducts setView={setView} data={data} />
            } else {
                return <></>
            }
         } 

}

export default NormalMain