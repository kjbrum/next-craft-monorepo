import '@/styles/global.css'

const App = ({ Component, pageProps }) => {
    return <Component {...pageProps} />
}

// App.getInitialProps = async ({ Component, ctx }) => {
//     const pageProps = Component.getInitialProps
//         ? Component.getInitialProps(ctx)
//         : {}

//     return {
//         pageProps,
//     }
// }

export default App
