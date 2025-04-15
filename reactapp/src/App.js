import React from 'react'
import Login from './Components/Login'
import { Routes,BrowserRouter,Route } from 'react-router-dom'
import HomePage from './Components/HomePage'
import Signup from './Components/Signup'
import"./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import ErrorPage from './Components/ErrorPage'
import"./../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import BookForm from './BookRecommenderComponents/BookForm.jsx'
import ViewBook from './BookRecommenderComponents/ViewBook.jsx'
import PrivateRoute from './Components/PrivateRoute.jsx'
import BookReaderViewBook from './BookReaderComponents/BookReaderViewBook.jsx'

const App = () => {
  return (
    <div>
        { <BrowserRouter>
          <Routes>
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path="/" element={<Login />} />
            <Route path="/Error" element={<ErrorPage />} />
            <Route path="/Add/:id" element={<PrivateRoute><BookForm/></PrivateRoute>}/>
            <Route path="/Add/" element={<PrivateRoute><BookForm/></PrivateRoute>}/>
            <Route path="/View" element={<PrivateRoute><ViewBook/></PrivateRoute>}/>
            <Route path="/ViewForReader" element={<PrivateRoute><BookReaderViewBook /></PrivateRoute>}/>
          </Routes>
        </BrowserRouter> }

    </div>


// Start from here 
  )
}

export default App