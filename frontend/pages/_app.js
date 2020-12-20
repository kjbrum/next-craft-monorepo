import { getMainNavigation } from '@/lib/api'
import '@/styles/global.css'

const App = ({ Component, navigation, pageProps }) => {
    return <Component {...pageProps} navigation={navigation} />
}

App.getInitialProps = async ({ Component, ctx }) => {
    const { navigation } = await getMainNavigation()

    const pageProps = Component.getInitialProps
        ? Component.getInitialProps(ctx)
        : {}

    return {
        navigation,
        pageProps,
    }
}

export default App
