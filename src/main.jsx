import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import HomePage from './page/home/HomePage.jsx';
import LoginPage from './page/login/LoginPage.jsx';
import RegisterPage from './page/register/RegisterPage';
import ErrorPage from "./page/error/ErrorPage.jsx";;
import ActivityPage from './page/activity/ActivityPage.jsx';
import PrivateRoutes from './utils/PrivateRoutes.jsx';
import RedirectRoutes from './utils/RedirectRoutes';
import KanbanPage from './page/kanban/KanbanPage';
import IdeaWallPage from './page/ideaWall/IdeaWallPage';

import { AuthProvider } from './context/AuthProvider.jsx';
import {
  BrowserRouter as Router, Routes, Route
} from "react-router-dom";
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} errorElement={<ErrorPage />} />
      <Route element={<RedirectRoutes />}>
        <Route path="login" element={<LoginPage />} errorElement={<ErrorPage />} />
      </Route>
      <Route path="register" element={<RegisterPage />} errorElement={<ErrorPage />} />
      <Route element={<PrivateRoutes />}>
        <Route path="activity" element={<ActivityPage />} errorElement={<ErrorPage />} />
        <Route path="kanban/:kanbanId" element={<KanbanPage />} errorElement={<ErrorPage />} />
        <Route path="kanban/:kanbanId/ideaWall/:thinkingRoutineId" element={<IdeaWallPage />} errorElement={<ErrorPage />} />
      </Route>
    </>
  )
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/* <ReactQueryDevtools initialIsOpen /> */}
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
