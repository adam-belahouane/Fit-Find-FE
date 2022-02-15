import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { getUserAction } from "../actions"

const Confirmed = () => {
    const Id = useParams().programId
    const navigate = useNavigate()
    const url = process.env.REACT_APP_BE_URL;
    const dispatch = useDispatch()
    const id = useSelector(state => state.login.url)

    const addToUser = async () => {
        try {
            let response = await fetch(`${url}/program/addToUser/${Id}`, {
                method: 'POST',
                credentials: 'include'
              })
              if(response.ok) {
                let data = await response.json()
                dispatch(getUserAction())
                navigate(`/user/${id}`, {replace: true})
                console.log('ok');
              } else {
                console.log('!!!!!!!');
              }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        addToUser()
    }, [])
    return<></>
}

export default Confirmed