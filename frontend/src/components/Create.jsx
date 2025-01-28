import React, { useState } from "react";

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  const [error, setError] = useState("");

  console.log(name, email, age);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const addUser = { name, email, age };

    const response = await fetch("http://localhost:5000", {
      method: "POST",
      body: JSON.stringify(addUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(result.error);
      setError(result.error);
    }

    if (response.ok) {
      console.log(result);
      setError("");
      setName("");
      setEmail("");
      setAge("");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card p-4 shadow-sm" style={{ minWidth: "400px" }}>
        <h2 className="text-center mb-4">Enter the Data</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          {/* Age Field */}
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              id="age"
              className="form-control"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
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
  );
};

export default Create;
