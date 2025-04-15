import React from 'react';
import './ErrorPage.css';
const ErrorPage = () => {
    return [
       <>
       <div className='model'>
        <div className="error-container text-center">
        <div className='py-5'>
        <h3 className='text-danger mb-3 he31'>Oops! Something Went Wrong</h3>
        <p>Please try again later.</p>
        <img className='img-fluid' src='./alert.png' alt="" />
        </div>
        </div>
        </div>
        </>
    ]
    
}
export default ErrorPage;