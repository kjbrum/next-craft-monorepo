import { getGlobalFields, getPageByUri, getPageUris } from '@/lib/api'
import { SectionHero } from '@/components/sections'

const Page = ({ page }) => (
    <SectionHero
        title={page.title}
        image={!!page.featuredImage.length && page.featuredImage[0]}
    />
)

Page.defaultProps = {
    page: {},
}

export async function getStaticProps({ params, preview = false, previewData }) {
    const uri = params.page.join('/')
    const globals = await getGlobalFields(previewData)

    try {
        const { page } = await getPageByUri(uri, previewData)

        return {
            props: {
                key: page.id,
                page,
                globals,
                seo: page.seomatic,
                preview,
            },
            revalidate: 1,
        }
    } catch (error) {
        return {
            props: {
                error: true,
                globals,
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
