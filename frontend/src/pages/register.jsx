import { useState } from "react";
import API from "../services/api";
import "./register.css";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // PASTE THE NEW handleSubmit HERE
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    console.log(formData);

    const response = await API.post("/auth/register", formData);

    console.log(response.data);

    alert("User Registered Successfully");

  } catch (error) {

    console.log(error.response?.data || error.message);

    alert("Registration Failed");
  }
};

  return (
  <div className="register-container">
    <div className="register-box">

      <h1>Register</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <button type="submit">Register</button>

      </form>

    </div>
  </div>
);
}

export default Register;