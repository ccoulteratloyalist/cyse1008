import React, { useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "../store"
import { useDispatch } from "react-redux";

function SignInPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmitSignIn = (event) => {
    event.preventDefault();
    dispatch(signInWithEmailAndPassword(formData));
  };

  const handleSubmitRegister = (event) => {
    event.preventDefault();
    dispatch(createUserWithEmailAndPassword(formData));
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
        <form autoComplete="on" onSubmit={handleSubmitRegister}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          autoFocus
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="button" onClick={toggleShowPassword}>
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
    <form autoComplete="on" onSubmit={handleSubmitSignIn}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          autoFocus
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="button" onClick={toggleShowPassword}>
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <div>
        <button type="submit">Sign In</button>
      </div>
    </form>
    </>

  );
}

export default SignInPage;
