import Error from '@/pages/_error'
import { StoreProvider } from '@/lib/store'
import { Layout } from '@/components/general'
import '@/styles/global.css'

const App = ({ Component, pageProps }) => {
    const { mainNavigation, footer } = pageProps.globals

    return (
        <StoreProvider>
            <Layout
                {...pageProps}
                mainNavigation={mainNavigation}
                footer={footer}
                seo={pageProps.seo || null}
            >
                {pageProps.error ? (
                    <Error statusCode={pageProps.statusCode || 404} />
                ) : (
                    <Component {...pageProps} />
                )}
            </Layout>
        </StoreProvider>
    )
}

export default App
