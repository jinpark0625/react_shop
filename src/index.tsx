import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home';
import Category from './pages/Product/Category';
import Product from './pages/Product/Product';
import NewProduct from './pages/Admin/NewProduct';
import MyCart from './pages/User/MyCart';
import NotFound from './pages/NotFound';
import ProtectedRoute from './pages/ProtectedRoute';
import Register from './pages/Auth/Register';
import AuthProtectedRoute from 'pages/AuthProtectedRoute';
import Login from './pages/Auth/Login';
import Collections from 'pages/Product/Collections';
import Nfts from 'pages/NFT/Nfts';
import NftDetail from 'pages/NFT/NftDetail';
import { StrictMode } from 'react';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />,
      },
      {
        path: '/collections',
        element: <Collections />,
      },
      {
        path: '/collections/:id',
        element: <Category />,
      },
      {
        path: '/product/:id',
        element: <Product />,
      },
      {
        path: '/addProduct',
        element: (
          <ProtectedRoute requireAdmin>
            <NewProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: '/carts',
        element: (
          <ProtectedRoute>
            <MyCart />
          </ProtectedRoute>
        ),
      },
      {
        path: '/nfts',
        element: <Nfts />,
      },
      {
        path: '/nfts/:id',
        element: <NftDetail />,
      },
      {
        path: '/register',
        element: (
          <AuthProtectedRoute>
            <Register />
          </AuthProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: (
          <AuthProtectedRoute>
            <Login />
          </AuthProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
