import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../store"
import { useDispatch } from "react-redux";
import { Container, Stack, TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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
