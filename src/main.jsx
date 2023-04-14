import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './layout/Main';
import Home from './components/Home/Home';
import Login from './components/Home/Login/Login';
import Register from './components/Register/Register';
import RegisterRBS from './components/RegisterRBS/RegisterRBS';
import RegisterBS from './components/RegisterBS/RegisterBS';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path:'/',
        element: <Home></Home>,

      },
      {
        path:'login',
        element: <Login></Login>

      },
      {
        path:'register',
        element: <Register></Register>

      },
      {
        path:'registerRbs',
        element: <RegisterRBS></RegisterRBS>

      },
      {
        path:'registerBS',
        element: <RegisterBS></RegisterBS>

      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
