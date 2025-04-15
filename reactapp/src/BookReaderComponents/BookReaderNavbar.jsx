import React from 'react';
import './BookReaderNavbar.css';
const BookReaderNavbar = () => {
  const handleClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
  }
  return (
    <nav className="book-reader-navbar">
      <ul className="navbar-menu">
        <div className="navbar-logo logo1"><h1>BookFinder</h1></div>
        <li><a href="#" id="userRole2">{localStorage.getItem("userName")} / BookReader</a></li>
        <li><a href="/Home">Home</a></li>
        <li className="dropdown">
          <a className="dropdown-toggle" href="#" id="bookDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Book
          </a>

          <ul className="dropdown-menu menu1" aria-aria-labelledby="bookDropdown">
            <li><a className="dropdown-item" href="/ViewForReader">View Book</a></li>
          </ul>

        </li>
        <li><a href="/" className="logout-btn" onClick={handleClick}>Logout</a></li>
      </ul>
    </nav>
  );
}

export default BookReaderNavbar;