import React, { useState } from 'react';
import axios from 'axios';

const Login = props => {
  const [credentials, setCredentials] = useState({});


  const login = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', credentials)
      .then(res => {
        console.log('login', res)
        localStorage.setItem('token', res.data.payload);
        props.history.push('/');
      })
  }

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
}

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  return (
    <>
      <form onSubmit={login}>
      <input
        type="text"
        name="username"
        value={credentials.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
      />
      <button>Login</button>
    </form>
    </>
  );
};

export default Login;
