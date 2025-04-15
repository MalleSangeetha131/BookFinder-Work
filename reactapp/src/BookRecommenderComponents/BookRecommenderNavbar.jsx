import React from 'react';
import './BookRecommenderNavbar.css';
const BookRecommenderNavbar = () => {
    const handleClick = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
    }
    return (
        <nav className="book-recommender-navbar">
            <ul className="navbar-menu">
                <div className="navbar-logo"><h1>BookFinder</h1></div>
                <li ><a href="#" id="navbarRole">{localStorage.getItem("userName")} / BookRecommender</a></li>
                <li><a href="/Home">Home</a></li>
                <li className="dropdown">
                    <a className="dropdown-toggle" href="#" id="bookDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Book
                    </a>
                    <ul className="dropdown-menu" id="menu1" aria-labelledby="bookDropdown">
                        <li><a className="dropdown-item" href="/Add">Add Book</a></li>
                        <li><a className="dropdown-item" href="/View">View Book</a></li>
                    </ul>
                </li>
                <li><a href="/" className="logout-btn" onClick={handleClick}>Logout</a></li>
            </ul>
        </nav>
    );
}
export default BookRecommenderNavbar;