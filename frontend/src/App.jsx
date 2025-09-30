import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react'
// pages & components
import Home from "./pages/HomePage";
import AddJobPage from "./pages/AddJobPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage"
import JobPage from "./pages/JobPage";
import EditJobPage from "./pages/EditJobPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(
  sessionStorage.getItem("isAuthenticated") === "true"
);
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar isAuthenticated={isAuthenticated} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
             
              <Route path="/add-job" element={isAuthenticated? <AddJobPage />:  <Navigate to="/login"/> } />
              <Route path='*' element={<NotFoundPage />} />
              <Route path="/jobs/:id" element={<JobPage />} />
              <Route path="/edit-job/:id" element={isAuthenticated ? <EditJobPage />: <Navigate to ="/login"/>} />
              <Route path="/signup"
                  element={
                    isAuthenticated ? (
                      <Navigate to="/" />
                    ) : (
                      <Signup setIsAuthenticated={setIsAuthenticated} />
                    )
                  }
                 />
              <Route path="/login"  
              element={
                    isAuthenticated ? (
                      <Navigate to="/" />
                    ) : (
                      <Login setIsAuthenticated={setIsAuthenticated} />
                    )
                  } />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
  
  export default App;
