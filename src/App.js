
import './global.css';
import React from 'react';
import { useScrollToTop } from './hooks/use-scroll-to-top';

import Router from './routes/sections';
import ThemeProvider from './theme';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

// import React from 'react';
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
// import ProtectedRoute from './components/ProtectedRoute';
// import SignInPage from './components/SignInPage';
// import HomePage from './components/HomePage';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <ProtectedRoute><HomePage/></ProtectedRoute>,
//   },
//   {
//     path: "/signin",
//     element: <SignInPage />
//   }
// ]);

// function App() {
//   return (
//     <RouterProvider router={router} />
//   );
// }

// export default App;