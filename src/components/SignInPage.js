import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../store"
import { useDispatch } from "react-redux";
import { Container, Stack, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmitSignIn = async (event) => {
    event.preventDefault();
    try {
      await dispatch(signInWithEmailAndPassword(formData)).unwrap(); // Ensure signInWithEmailAndPassword is set up to return a promise
      navigate('/'); // Navigate to home page on successful sign-in
    } catch (error) {
      // Handle sign-in error
      console.error('Sign-in failed:', error);
    }
  };

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    try {
      await dispatch(createUserWithEmailAndPassword(formData)).unwrap(); // Ensure createUserWithEmailAndPassword is set up to return a promise
      navigate('/'); // Navigate to home page on successful registration
    } catch (error) {
      // Handle registration error
      console.error('Registration failed:', error);
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm">
      <Stack spacing={1}>
        <form autoComplete="on" onSubmit={handleSubmitRegister}>
          <TextField
            autoFocus
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ bottomMargin: 2 }}>
            Register
          </Button>
        </form>
        <form autoComplete="on" onSubmit={handleSubmitSignIn}>
          {/* ... Repeat the same TextField and Button components for sign-in ... */}
          <Button type="submit" variant="contained" color="secondary" fullWidth>
            Sign In
          </Button>
        </form>
      </Stack>
    </Container>
  );
}

export default SignInPage;
