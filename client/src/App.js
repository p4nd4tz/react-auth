import React, { useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Products from './pages/Products';
import HomePage from './pages/Home';
import Navbar from './pages/Navbar';
import SignIn from './pages/SignIn';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthAsync, selectUserChecked } from './features/auth/authSlice';

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
]);


function App() {
  const dispatch = useDispatch();
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  return (
    <div className='App'>
      {userChecked && (
        <RouterProvider router={router} />
      )}
    </div>
  );
}

export default App;