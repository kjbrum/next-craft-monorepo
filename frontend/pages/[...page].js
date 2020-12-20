import Error from 'next/error'
import { getPageByUri, getPageUris } from '@/lib/api'
import { Layout } from '@/components/general'
import { SectionHero } from '@/components/sections'

const Page = ({ page, navigation, error, preview }) => {
    // Error
    if (error || !page) return <Error statusCode={404} />

    return (
        <Layout seo={page.seomatic} navigation={navigation} preview={preview}>
            <SectionHero
                title={page.title}
                image={!!page.featuredImage.length && page.featuredImage[0]}
            />
        </Layout>
    )
}

Page.defaultProps = {
    page: {},
    error: false,
}

export async function getStaticProps({ params, preview = false, previewData }) {
    const uri = params.page.join('/')

    try {
        const { page } = await getPageByUri(uri, previewData)

        return {
            props: {
                key: page.id,
                preview,
                page,
            },
            revalidate: 1,
        }
    } catch (error) {
        return {
            props: {
                error: true,
                preview,
            },
        }
    }
}

export async function getStaticPaths() {
    const { pages } = await getPageUris()

    return {
        paths: pages
            .map(page => page.uri)
            .map(uri => ({
                params: { page: uri.split('/') },
            })),
        fallback: 'blocking',
    }
}

export default Page
