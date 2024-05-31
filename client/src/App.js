import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Products from './pages/Products';
import HomePage from './pages/Home';
import Navbar from './pages/Navbar';
import SignIn from './pages/SignIn';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/products", element: <Products /> },
      { path: "/auth/signin", element: <SignIn /> }
    ]
  },
  // {
  //   path: "/auth",
  //   children: [
  //     { index: true, element: <SignIn /> },
  //     { path: "signin", element: <SignIn /> },
  //     // { path: "/signup", element: <SignUp /> },
  //   ]
  // }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;