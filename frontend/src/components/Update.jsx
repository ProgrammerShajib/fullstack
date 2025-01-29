import React, { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom';
 

const Update = () => {

    // State variables using useState hook
    const [name, setName] = useState("");        // Stores user's name input
    const [email, setEmail] = useState("");      // Stores user's email input
    const [age, setAge] = useState("");          // Stores user's age input
    const [error, setError] = useState("");      // Stores error messages

    const {id} = useParams()

    const navigate = useNavigate()
    // get single user data
  
   const getSingleUser = async ()=>{

    
    const response = await fetch(`http://localhost:5000/${id}`)


    const result = await response.json();

    if (!response.ok) {
      console.log(result.error)
      setError(result.error)
    }
    if (response.ok) {
      
      setError("")
      console.log("Updated user: ",result)
      setName(result.name)
      setAge(result.age)
      setEmail(result.email)
       
    }
   }
     // Form submission handler
  const handleUpdate = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior
    
    // Create user object from state values
    const updateUser = { name, email, age };

    // Send POST request to backend API
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateUser),  // Convert JS object to JSON string
      headers: {
        "Content-Type": "application/json",  // Set content type header
      },
    });

    // Parse response JSON data
    const result = await response.json();

    // Handle errors
    if (!response.ok) {
      console.error(result.error);
      setError(result.error);  // Set error message in state
    }

    // Handle successful response
    if (response.ok) {
      console.log(result);
      setError("");    // Clear any previous errors
      setName("");     // Reset name field
      setEmail("");    // Reset email field
      setAge(0);      // Reset age field
      navigate("/all")
    }
  };


  useEffect(()=>{
    getSingleUser();

  },[]);
  


  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
    {/* Error message display - only shows when error exists */}
    {error && <div className="alert alert-danger">{error}</div>}
    
    <div className="card p-4 shadow-sm" style={{ minWidth: "400px" }}>
      <h2 className="text-center mb-4">Edit the Data</h2>
      
      {/* Form element with onSubmit handler */}
      <form onSubmit={handleUpdate}>
        
        {/* Name Input Field */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Enter your name"
            value={name}  // Controlled component
            onChange={(e) => setName(e.target.value)}  // Update name state
          />
        </div>

        {/* Email Input Field */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}  // Controlled component
            onChange={(e) => setEmail(e.target.value)}  // Update email state
          />
        </div>

        {/* Age Input Field */}
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input
            type="number"
            id="age"
            className="form-control"
            placeholder="Enter your age"
            value={age}  // Controlled component
            onChange={(e) => setAge(e.target.value)}  // Update age state
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Update
