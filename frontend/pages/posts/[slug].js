import Error from 'next/error'
import { getPostBySlug, getPostSlugs } from '@/lib/api'
import { Layout, Container, Prose } from '@/components/general'
import { SectionHero } from '@/components/sections'

const Post = ({ post, error, navigation, preview }) => {
    // Error
    if (error || Object.keys(post).length === 0)
        return <Error statusCode={404} />

    return (
        <Layout seo={post.seomatic} navigation={navigation} preview={preview}>
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
                                width: 768,
                            },
                        }}
                    >
                        {post.body}
                    </Prose>
                </Container>
            )}
        </Layout>
    )
}

Post.defaultProps = {
    post: {},
    error: false,
}

export async function getStaticProps({ params, preview = false, previewData }) {
    const { slug } = params

    try {
        const { post } = await getPostBySlug(slug, previewData)

        return {
            props: {
                key: post.id,
                preview,
                post,
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
