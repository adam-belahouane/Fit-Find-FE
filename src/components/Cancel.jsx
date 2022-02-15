import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Cancel = () => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate(-3)

    }, [])
    return <></>
}

export default Cancel