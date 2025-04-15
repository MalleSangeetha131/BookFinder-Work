import React from 'react';
import { Navigate } from 'react-router-dom' ;

const PrivateRoute = ({children}) => {
let isAuthenticated = localStorage.getItem("isAuthenticated");
return isAuthenticated ? children : <Navigate to="/Error" /> ;
};

export default PrivateRoute;