import { useState } from 'react'
import { gql } from 'graphql-request'
import { fetchAPI, getMainNavigation } from '@/lib/api'
import { SEOMATIC_FRAGMENT } from '@/lib/fragments'
import { Flex, Button } from '@/components/core'
import { Layout, Container } from '@/components/general'
import { SectionHero, SectionPostsList } from '@/components/sections'

export const HOME_QUERY = gql`
    ${SEOMATIC_FRAGMENT}
    {
        page: entry(section: "homepage") {
            seomatic {
                ...SeomaticFragment
            }
            ... on homepage_homepage_Entry {
                featuredImage {
                    ... on uploads_Asset {
                        url
                        alt
                    }
                }
            }
        }
        posts: entries(section: "posts", limit: ${process.env.POSTS_PER_PAGE}, orderBy: "postDate DESC") {
            id
            slug
            title
            ... on posts_posts_Entry {
                featuredImage {
                    ... on uploads_Asset {
                        url
                        alt
                    }
                }
            }
        }
        totalPosts: entryCount(section: "posts")
    }
`

const Home = ({ page, posts, hasMore, navigation, preview }) => {
    const [offset, setOffset] = useState(process.env.POSTS_PER_PAGE)
    const [allPosts, setAllPosts] = useState(posts)
    const [isFetching, setIsFetching] = useState(false)
    const [hasMorePosts, setHasMorePosts] = useState(hasMore)

    const fetchMorePosts = async () => {
        if (!isFetching) {
            setIsFetching(true)

            const res = await fetch(
                `/api/getPaginatedPosts?offset=${offset}&limit=${process.env.POSTS_PER_PAGE}`
            )

            const {
                posts: newPosts,
                offset: newOffset,
                hasMore,
            } = await res.json()

            setAllPosts(prevState => [...prevState, ...newPosts])
            setOffset(newOffset)
            setHasMorePosts(hasMore)
            setIsFetching(false)
        }
    }

    return (
        <Layout seo={page.seomatic} navigation={navigation} preview={preview}>
            <SectionHero
                title="Next + Craft Monorepo"
                image={page?.featuredImage[0]}
            />

            <Container className="py-16 md:py-24">
                {allPosts && <SectionPostsList posts={allPosts} />}

                {hasMorePosts && (
                    <Flex className="justify-center pt-8 md:pt-16">
                        <Button
                            variant="filled"
                            className={
                                isFetching && 'opacity-25 pointer-event-none'
                            }
                            onClick={fetchMorePosts}
                        >
                            Load More Posts
                        </Button>
                    </Flex>
                )}
            </Container>
        </Layout>
    )
}

export async function getStaticProps({ preview = false, previewData }) {
    const { navigation } = await getMainNavigation()
    const { page, posts, totalPosts } = await fetchAPI(HOME_QUERY, {
        previewData,
    })

    return {
        props: {
            page,
            posts,
            hasMore: process.env.POSTS_PER_PAGE < totalPosts,
            navigation,
            seo: page.seomatic,
            preview,
        },
        revalidate: 1,
    }
}

export default Home
