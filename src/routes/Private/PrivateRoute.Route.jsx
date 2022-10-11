import { Navigate } from "react-router-dom";
import DefaultLayout from "Layout/default/DefaultLayoutMainLayout";
import { useState } from "react";
import { useEffect } from "react";

const PrivateRoute = ({ Component, hasLayout }) => {
  const [isLoggedIn,setIsLoggedIn] = useState(localStorage.getItem('authToken'))
  useEffect(()=>{
    setInterval(()=>{
      
    },4000)
  },[])

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  
  return hasLayout ? (
    <DefaultLayout>
      <Component />
    </DefaultLayout>
  ) : (
    <Component />
  );
};
export default PrivateRoute;
