import React, { useEffect, useState, useContext, createContext } from 'react';
import axios from 'axios';
import './BookReaderViewBook.css';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../apiConfig';
import BookReaderNavbar from './BookReaderNavbar';
 
// UserContext to manage user data
const UserContext = createContext();
 
// Custom hook to access UserContext
const useUser = () => useContext(UserContext);
 
function BookReaderViewBook() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
 
    const { user } = useUser(); // Get user info from UserContext
 
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                // Fetching books from the API
                const response = await axios.get(`${API_BASE_URL}api/books`);
                setBooks(response.data); // Assuming response.data is an array of books
                console.log(response);
            } catch (err) {
                setError('Error fetching book details');
                console.log("data fetch error");
            } finally {
                setLoading(false);
            }
        };
 
        fetchBooks();
    }, []);
 
    // Filter books based on search term
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
 
     
    return (
        <div >
            <div className='navbar'>
            <BookReaderNavbar/>
 
            </div>
            <h2 style={{ textAlign: 'center' }}>Available Books</h2>
 
            {/* Search box */}
            <div >
                <input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>
 
            {loading ? (
                <div>Loading...</div>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th> {/* Row number column */}
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Published Date</th>
                            <th>Cover Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBooks.length === 0 ? (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center' }}>Oops! No books found.</td>
                            </tr>
                        ) : (
                            filteredBooks.map((book, index) => (
                                <tr key={book.bookId}>
                                    <td>{index+1}</td>
                                    <td>{book.title}</td> {/* Display row number */}                                  
                                    <td>{book.author}</td>
                                    <td>{book.genre}</td>
                                    <td>{book.publishedDate}</td>
                                   
                                    <td>
                                        <img
                                            src={book.coverImage}
                                            alt={book.title}
                                            className="book-image"
                                        />
                                    </td>
                                   
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
 
            {/* Footer always displayed */}
            <footer className="footer">
                <h2>Contact Us</h2>
                <p>Email: {user?.email || 'N/A'}</p> {/* Fallback to 'N/A' if no user data */}
                <p>Phone: {user?.phone || 'N/A'}</p>
            </footer>
        </div>
    );
}
 
// App component wrapping ViewPlant with UserContext provider
function App() {
    const [user, setUser] = useState({
        email: 'user@example.com',
        phone: '123-456-7890',
    });
 
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <BookReaderViewBook />
        </UserContext.Provider>
    );
}
 
export default App;