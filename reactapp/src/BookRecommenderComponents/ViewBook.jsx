import React, { useEffect, useState, useContext, createContext } from 'react';
import axios from 'axios';
import './ViewBook.css';
 
 
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import BookRecommenderNavbar from './BookRecommenderNavbar';
import API_BASE_URL from '../apiConfig';
 
// UserContext to manage user data
const UserContext = createContext();
 
// Custom hook to access UserContext
const useUser = () => useContext(UserContext);
 
function ViewBook() {
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
 
    const handleEdit = (id) => {
        navigate(`/Add/${id}`);  // Ensure it matches the route defined for editing
        // Navigating to PlantForm with bookId for editing
    };
 
 
    const handleDelete = async (delbook) => {
        Swal.fire({
            title: 'Delete!',
            text: 'Do you want to delete ' + delbook.name + '.',
            icon: 'warning',
            confirmButtonText: 'Yes',
            showCancelButton: true,
            cancelButtonText: 'No'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.delete(`${API_BASE_URL}api/books/${delbook.bookId}`);
                if (response.status === 200) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'The ' + delbook.name + ' has been deleted successfully.',
                        icon: 'success',
                    });
                    setBooks(books.filter(book => book.bookId !== delbook.bookId));
                }
            }
        });
    };
   
 
    return (
        <div >
            <div className='navbar'>
            <BookRecommenderNavbar/>
 
            </div>
            <h2 style={{ textAlign: 'center' }}>Books</h2>
 
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
                            <th>Actions</th>
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
                                    <td>
                                        <button className="btn btn-success" onClick={() => handleEdit(book.bookId)}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(book)}>Delete</button>
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
            <ViewBook />
        </UserContext.Provider>
    );
}
 
export default App;