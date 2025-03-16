import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './forms.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import ENV from '../../data/Env';

const SignIn = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.username || !formData.password) {
      Notiflix.Notify.failure('Username and Password are required');
      return;
    }

    try {
      const response = await axios.post(ENV.SERVER+'/login', formData);
      Notiflix.Notify.success('Login successful');
      if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data.user));
        // Redirect to home page
        navigate('/logged/profile')
      } else {
        Notiflix.Notify.failure("Login Failed! Check your credentials and try Again");
      }
      
    } catch (error) {
      Notiflix.Notify.failure("Login Failed");
    }
  };

  return (
    <div className="signup-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Welcome Back</h2>
        <img src={`${process.env.PUBLIC_URL}/images/art.png`} alt="Healthcare" />
        <p>Access your personalized healthcare services by logging into your account.</p>
      </div>

      {/* Form Section */}
      <div className="form-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username or Email</label>
            <input type="text" name="username" placeholder="Enter Username or Email" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter Password" onChange={handleChange} />
          </div>

          <button type="submit" className="signup-button">Sign In</button>
          <p className="signin-link">Don't have an account? <Link to="/sign-up">Sign Up</Link></p>
          <p className="forgot-password-link"><Link to="/forgot-password">Forgot Password?</Link></p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
