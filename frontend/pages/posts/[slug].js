import { getGlobalFields, getPostBySlug, getPostSlugs } from '@/lib/api'
import { Container, Prose } from '@/components/general'
import { SectionHero } from '@/components/sections'

const Post = ({ post }) => (
    <>
        <SectionHero
            title={post.title}
            actionLink="/"
            actionText="&larr; Back to Home"
            image={post.featuredImage[0]}
        />

        {post.body && (
            <Container>
                <Prose
                    className="prose-lg max-w-screen-md mx-auto py-8 lg:py-16"
                    parseOptions={{
                        img: {
                            sizes: '(min-width: 768px) 768px, 100vw',
                            width: 768,
                        },
                    }}
                >
                    {post.body}
                </Prose>
            </Container>
        )}
    </>
)

Post.defaultProps = {
    post: {},
}

export async function getStaticProps({ params, preview = false, previewData }) {
    const { slug } = params
    const globals = await getGlobalFields(previewData)

    try {
        const { post } = await getPostBySlug(slug, previewData)

        return {
            props: {
                key: post.id,
                post,
                globals,
                seo: post.seomatic,
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
    const { posts } = await getPostSlugs()

    return {
        paths: posts
            .map(post => post.slug)
            .map(slug => ({
                params: { slug },
            })),
        fallback: 'blocking',
    }
}

export default Post
