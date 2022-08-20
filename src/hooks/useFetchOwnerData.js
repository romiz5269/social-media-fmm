import jwt_decode from 'jwt-decode'

const useFetchOwnerData = () => {
    const userData = localStorage.getItem("ACCESS_TOKEN")
      ? jwt_decode(localStorage.getItem("ACCESS_TOKEN"))
      : null; 
    return userData
}
export default useFetchOwnerData;