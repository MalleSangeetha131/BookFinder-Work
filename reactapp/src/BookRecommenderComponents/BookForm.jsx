
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API_BASE_URL from '../apiConfig';
import axios from 'axios';
import './BookForm.css';
import BookRecommenderNavbar from './BookRecommenderNavbar';
import Swal from 'sweetalert2';

const BookForm = () => {
  const [formData, setFormData] = useState({
    author: '',
    title: '',
    genre: '',
    publishedDate: '',
    coverImage: null, // Hold file object here
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams(); // Extract plant ID from the URL

  const navigate = useNavigate();

  // Fetch plant data for editing if an ID is present
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const fetchBookData = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}api/books/${id}`);
          const bookData = response.data;
          console.log(response.data);
          setFormData({
            author: bookData.author,
            genre: bookData.genre,
            title: bookData.title,
            publishedDate: bookData.publishedDate,
            coverImage: null, // Reset coverImage since it's a file upload now
          });
        } catch (error) {
          console.log('Error fetching book data', error);
        }
      };

      fetchBookData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // Handle file input for images
    });
  };

  // Function to convert image file to Base64 string
  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result); // Resolve the base64 string
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file); // Convert image to Base64
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title) errors.title = "Title is required";
    if (!formData.author) errors.author = "Author is required";
    if (!formData.publishedDate) errors.publishedDate = "Published date is required";
    if (!formData.genre) errors.genre = "Genre is required";
    if (!formData.coverImage) errors.coverImage = "Cover Page is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitted(true);

      let coverImageBase64 = null;

      if (formData.coverImage) {
        try {
          coverImageBase64 = await convertImageToBase64(formData.coverImage); // Convert image to Base64
        } catch (error) {
          console.error('Error converting image', error);
        }
      }

      const payload = {
          author: formData.author,
            genre: formData.genre,
            title: formData.title,
            publishedDate: formData.publishedDate,
           coverImage: coverImageBase64 // Send Base64 string to the API
      };

      try {
        if (isEditing) {
          // If editing, make a PUT request to update the plant
          await axios.put(`${API_BASE_URL}api/books/${id}`, payload);
          console.log('Book updated successfully');
          Swal.fire({
            title: "Book updated Successfully!!!!",
            //text: "You clicked the button!",
            icon: "success"
          });
        } else {
          // If not editing, make a POST request to create a new plant
          await axios.post(`${API_BASE_URL}api/books`, payload);
          console.log('Book created successfully');
          Swal.fire({
            title: "Book created Successfully!!!!",
            //text: "You clicked the button!",
            icon: "success"
          });
        }

        navigate('/View'); // Navigate back to the view page
      } catch (error) {
        console.error('Error saving book', error.response ? error.response.data : error.message);
      }
    } else {
      setErrors(formErrors);
      setIsSubmitted(false); // Reset modal display
    }
  };

  const closeModal = () => {
    setIsSubmitted(false);
    navigate('/View'); // Use navigate to go to view-plant on close
  };

  return (
    <div>
      <BookRecommenderNavbar/>
      <form className="text-center my-2 " id="form1" onSubmit={handleSubmit}>
        <button className="back-button" type="button" onClick={() => navigate(-1)}>Back</button>
        <h2>{isEditing ? 'Edit Book' : 'Create New Book'}</h2>

        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className='form-control'
        />
        {errors.title && <span className="error">{errors.title}</span>}

        <label htmlFor="author">Author:</label>
        <input
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className='form-control'
       ></input>
        {errors.author && <span className="error">{errors.author}</span>}

        <label htmlFor="publishedDate">Published Date:</label>
        <input
          type="date"
          name="publishedDate"
          placeholder="publishedDate"
          value={formData.publishedDate}
          onChange={handleChange}
          className='form-control'
        />
        {errors.publishedDate && <span className="error">{errors.publishedDate}</span>}

        <label htmlFor="genre">Genre:</label>
        <input
          name="genre"
          placeholder="genre"
          value={formData.genre}
          onChange={handleChange}
          className='form-control'
        />
        {errors.genre && <span className="error">{errors.genre}</span>}

        <label htmlFor="coverImage">Book Image:</label>
        <input
          type="file"
          name="coverImage"
          onChange={handleChange}
          className='form-control'
        />
        {errors.coverImage && <span className="error">{errors.coverImage}</span>}

        <button type="submit" className='btn btn-primary mt-3'>{isEditing ? 'Update Book' : 'Add Book'}</button>
      </form>

      {isSubmitted && (
        <div className="modal">
          <div className="modal-content">
            <p>{isEditing ? 'Book Updated Successfully!' : 'Book Added Successfully!'}</p>
            <button type="button" className='btn btn-primary' onClick={closeModal}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookForm;

