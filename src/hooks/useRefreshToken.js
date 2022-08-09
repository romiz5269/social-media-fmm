import AuthContext from "Context/AuthContext/AuthContext.auth";
import { useContext, useRef } from "react";
import { http } from "services/Http/axios";

const useRefreshToken = ()=>{
    const {setAuth} = useContext(AuthContext)
    const refresh = async()=>{
        const response = await http.post("/polls/token/refresh/", {
          withCredentials: true,
        });
        setAuth(prev=>{
            console.log(JSON.stringify(prev))
            console.log(response.data.access)
            return {...prev,access:response.data.access}
        })
        return response.data.access;
    }

    return refresh
}
export default useRefreshToken