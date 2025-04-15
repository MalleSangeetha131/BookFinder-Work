import React from 'react';
import './HomePage.css';
import Footer from './Footer';
import BookReaderNavbar from '../BookReaderComponents/BookReaderNavbar';
import BookRecommenderNavbar from '../BookRecommenderComponents/BookRecommenderNavbar';
const HomePage = ({ userRole }) => {
  return (
    <div>
      {localStorage.getItem("isAuthenticated") ==="true"?
      localStorage.getItem("userRole") === 'BookReader' ? <BookReaderNavbar /> : <BookRecommenderNavbar />
      :""}
      
      <div className="homepage-content">
        <div className="homepage-banner">
          <img src="/bookfindercoverimage.jpeg" alt="BookFinder" />
          <h1 className="banner-text">BookFinder</h1>
        </div>
        <p className="intro-text">
          An app to discover, explore, and recommend books tailored to your reading preferences.
        </p>
      </div>
      <Footer />
    </div>
  );
}
export default HomePage;