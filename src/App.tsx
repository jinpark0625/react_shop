import 'react-lazy-load-image-component/src/effects/blur.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './App.css';

import { Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import { AuthContextProvider } from 'context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toast';
import Footer from 'components/layout/Footer';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ScrollToTop from 'components/ScrollToTop';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID!;

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      <AuthContextProvider>
        <PayPalScriptProvider
          options={{ 'client-id': CLIENT_ID, currency: 'CAD' }}
        >
          <Navbar />
          <Outlet />
          <Footer />
          <ToastContainer delay={3000} position="top-right" />
        </PayPalScriptProvider>
      </AuthContextProvider>
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
    </QueryClientProvider>
  );
}
