import React, { useState } from 'react';
import validation from './signUpValidation';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    contact: ''
  });

  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
  }
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setError(validation(values))
      const data = {
        name: values.name[0],
        email: values.email[0],
        password: values.password[0],
        contact: values.contact[0]
      }
      if (data) {
        const result = await axios.post('http://localhost:8080/users/userRegistration', data);
        console.log("result", result)
        if (result.status === 200) {
          // navigate('/');
          setValues("");
          setSuccess(true);


        }
      }
    } catch (error) {

    }
  }
  return (
    <>
      <div className='d-flex justify-content-center align-items-center bg-primary vh-100 '>
        <div className='bg-white p-3 rounded w-25' >
          <form action='' onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='email'> User Name</label>
              <input type='userName' placeholder='Enter user name' onChange={handleInput} name="name" className='form-control rounded-0' />
              {error.name && <span className='text-danger'>{error.name}</span>}
            </div>
            <div className='mb-3'>
              <label htmlFor='email'> Email</label>
              <input type='email' placeholder='Enter email' onChange={handleInput} name="email" className='form-control rounded-0' />
              {error.email && <span className='text-danger'>{error.email}</span>}
            </div>
            <div className='mb-3'>
              <label htmlFor='password'> Password</label>
              <input type='password' placeholder='Enter Password' onChange={handleInput} name='password' className='form-control rounded-0' />
              {error.password && <span className='text-danger'>{error.password}</span>}
            </div>
            <div className='mb-3'>
              <label htmlFor='password'> Contact</label>
              <input type='password' placeholder='Enter Contact' onChange={handleInput} name="contact" className='form-control rounded-0' />
              {error.contact && <span className='text-danger'>{error.contact}</span>}
            </div>
            {success === true && (
              <span className='text-primary'>Register successfully please click on login .</span>
            )}
            <button className='btn btn-primary border w-100'>Submit</button>
            <Link to="/" className='btn btn-primary border w-100'>Login</Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;