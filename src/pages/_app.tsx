import '../../styles/globals.css'
import type { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { SessionProvider } from "next-auth/react"
import { ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Header/>
      <ToastContainer autoClose={3000} />
      <Component {...pageProps} />
    </SessionProvider>
  )
}
