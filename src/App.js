import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import SignInPage from './components/SignInPage';
import HomePage from './components/HomePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><HomePage/></ProtectedRoute>,
  },
  {
    path: "/signin",
    element: <SignInPage />
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;