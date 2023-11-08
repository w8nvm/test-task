import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {persistor, store} from './app/store';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { Paths } from './Paths';
import {Login} from "./pages/login";
import {Users} from "./pages/users";
import {AddUser} from "./pages/addUser";
import {EditUser} from "./pages/editUser";
import {PersistGate} from "redux-persist/integration/react";

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
        path: `${Paths.userEdit}/:id`,
        element: <EditUser />,
    },
])
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <RouterProvider router={router}></RouterProvider>
        </PersistGate>
    </Provider>
  </React.StrictMode>
);