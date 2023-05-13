import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import HomePage from './page/HomePage.jsx'
import LoginPage from './page/LoginPage.jsx'
import ErrorPage from "./page/ErrorPage.jsx";
import ActivityPage from './page/ActivityPage.jsx'
import PrivateRoutes from './utils/PrivateRoutes.jsx'

import { AuthProvider } from './context/AuthProvider.jsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomePage />,
//     errorElement: <ErrorPage />
//   },
//   {
//     path: "/login",
//     element: <LoginPage />,
//     errorElement: <ErrorPage />
//   },
//   {
//     path: "/activity",
//     element:
//       <PrivateRoutes>
//         <ActivityPage />
//       </PrivateRoutes>
//     ,
//     errorElement: <ErrorPage />
//   }
// ]);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} errorElement={<ErrorPage />} />
      <Route path="/login" element={<LoginPage />} errorElement={<ErrorPage />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/activity" element={<ActivityPage />} errorElement={<ErrorPage />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
