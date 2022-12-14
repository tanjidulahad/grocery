import { useEffect, useState } from 'react';
import Layout from '@components/layout';
import store from '@redux/store';
import { Provider } from 'react-redux';
import Router, { useRouter } from 'next/router'
// import NProgress from 'nprogress'; //nprogress module
// import 'nprogress/nprogress.css'
import '@styles/mobauth.scss'
// Global Styles
import '@styles/globals.css'
import '@styles/globals.scss'

// Components Styles
import '@styles/inputs.scss'
import '@styles/product-item.scss'
import '@styles/navbar.scss'
import '@styles/auth.scss'
import '@styles/pdp-image.scss'
import '@styles/mob-cat.scss'
import '@styles/cat.scss'

// Page Styles
import '@styles/product.scss'
import '@styles/cart.scss'
import '@styles/saved-places.scss'

//slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleAnalytics from '@components/GoogleAnalytics/GoogleAnalytics';
import ZendeskChat from '@components/ZendeskChat/ZendeskChat';
import FreshChat from '@components/FreshChat/FreshChat';

if (process.env.NODE_ENV !== 'development') {
  console.log = () => { };
}

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Provider store={store}>
    <GoogleAnalytics></GoogleAnalytics>
    <ZendeskChat></ZendeskChat>
    <FreshChat></FreshChat>
      <Layout>
      <ToastContainer></ToastContainer>
        <Component {...pageProps} />
      </Layout>
    </Provider>
    </>
  )
}

export default MyApp
