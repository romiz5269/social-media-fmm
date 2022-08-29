import jwtDecode from "jwt-decode"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchOwnerProfile } from "store/Reducers/Users/UsersReducer"


export const useGetOwnerUsername = () => {
    const ownerId = jwtDecode(localStorage.getItem('authToken'))
    const [ownerUsername,setOwnerUsername] = useState('')
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchOwnerProfile(ownerId))
    },[])
    const miniProfile = useSelector(state=>state.users.ownerUser);
    setOwnerUsername(miniProfile?.username)
    return ownerUsername;

}