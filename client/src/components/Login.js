import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialForm = {
  username: '',
  password: ''
}

const Login = () => {

  const [credentials, setCredentials] = useState(initialForm)
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [])

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
    .post(`/api/login`, credentials)
    .then(res => {
      localStorage.setItem('token', res.data.payload)
      setLoggedIn(true);
    })
    .catch(error => {
      console.error(error);
    })
  }

  const handleChange = e => {
    e.persist();
    setCredentials({...credentials, [e.target.name]: e.target.value})

  }
  return (
    <div className="login-wrapper">
      <h1>Welcome to the Bubble App!</h1>
      <h2>{loggedIn ? "You are Logged In" : "Please login"}</h2>
      <form onSubmit={login}>
          <input
            type="text"
            name="username"
            placeholder='username'
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder='password'
            value={credentials.password}
            onChange={handleChange}
          />
          <button>Log in</button>
        </form>
    </div>
  );
};

export default Login;
