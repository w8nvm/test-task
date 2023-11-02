import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { Paths } from './Paths';
import {Login} from "./pages/login";
import {Users} from "./pages/users";
import {AddUser} from "./pages/addUser";
import {Status} from "./pages/status";
import {EditUser} from "./pages/editUser";

const router = createBrowserRouter([
    {
      path: Paths.home,
      element: <Users/>
    }, {
        path: Paths.login,
        element: <Login/>
    }, {
        path: Paths.addUser,
        element: <AddUser/>
    }, {
        path: `${Paths.status}/:status`,
        element: <Status/>
    }, {
        path: `${Paths.userEdit}/:id`,
        element: <EditUser />,
    },
])
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
