import '@fortawesome/fontawesome-svg-core/styles.css'
import Layout from "../src/components/layout/Layout";
import '../src/fontawesome';
import VetProvider from "../src/store/vet-provider";
import '../styles/form.css';
import '../styles/globals.css';

function MyApp({Component, pageProps}) {
    return <VetProvider>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </VetProvider>
}

export default MyApp
