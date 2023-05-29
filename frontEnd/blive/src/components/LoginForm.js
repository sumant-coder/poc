import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from './LoginValidation';
import axios from 'axios';

const LoginForm = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
  }
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setError(validation(values))
      const data = {
        email: values.email[0],
        password: values.password[0]
      }

      const result = await axios.post('http://localhost:8080/users/userLogin', data)
      navigate('/Home');
      localStorage.setItem("auth-token", result.data.token);
    } catch (error) {

    }
  }
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100 '>
      <div className='bg-white p-3 rounded w-25' >
        <form action='' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'> Email</label>
            <input type='email' onChange={handleInput} name='email' placeholder='Enter email' className='form-control rounded-0' />
            {error.email && <span className='text-danger'>{error.email}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor='password'> Password</label>
            <input type='password' onChange={handleInput} name='password' placeholder='Enter Password' className='form-control rounded-0' />
            {error.password && <span className='text-danger'>{error.password}</span>}
          </div>
          <button type='submit' className='btn btn-success'>Login in</button>
          <p>Register click below button</p>
          <Link to="/SignUp" className='btn btn-default border w-100'> Register</Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
