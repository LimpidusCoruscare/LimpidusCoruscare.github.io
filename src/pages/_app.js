import "@/styles/globals.css";
import { ThemeProvider } from 'next-themes';
import Layout from '../components/Layout';
import 'prismjs/themes/prism-okaidia.css';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
