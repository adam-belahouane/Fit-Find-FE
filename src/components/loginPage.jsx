import { useState } from "react"
import NormalLoginPage from "./NormalLoginPage"
import ProLoginPage from "./ProLoginPage"

const LoginPage = () => {
    const [view, setView] = useState("normal")

    if(view === "normal") {
        return <NormalLoginPage setView={setView} />
    } else {
        return <ProLoginPage setView={setView} />
    }
    
}

export default LoginPage