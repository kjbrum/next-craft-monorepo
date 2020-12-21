import Head from 'next/head'
import parse from 'html-react-parser'
import { parseUploadUrls } from '@/lib/helpers'
import { Flex } from '@/components/core'
import { Alert, Footer, Header, ScreenReader } from '@/components/general'

export const Layout = ({ mainNavigation, footer, seo, preview, children }) => (
    <>
        {seo && (
            <Head>
                {parse(parseUploadUrls(seo.metaTitleContainer))}
                {parse(parseUploadUrls(seo.metaTagContainer))}
                {parse(parseUploadUrls(seo.metaLinkContainer))}
                {parse(
                    JSON.parse(parseUploadUrls(seo.metaScriptContainer)).script
                )}
                {parse(parseUploadUrls(seo.metaJsonLdContainer))}
            </Head>
        )}

        <ScreenReader as="a" href="#content">
            Skip to content
        </ScreenReader>

        <Flex className="flex-col min-h-screen">
            {preview && (
                <Alert href="/api/exit-preview">
                    Preview Mode: Click to exit
                </Alert>
            )}

            <Header navigation={mainNavigation} />

            <Flex
                as="main"
                id="content"
                role="main"
                className="flex-1 flex-col"
            >
                {children}
            </Flex>

            <Footer copyright={footer?.copyright} />
        </Flex>

        {seo && (
            <>
                {parse(
                    JSON.parse(parseUploadUrls(seo.metaScriptContainer))
                        .bodyScript
                )}
            </>
        )}
    </>
)

Layout.defaultProps = {
    mainNavigation: null,
    footer: null,
    seo: null,
    preview: false,
}

export default Layout
