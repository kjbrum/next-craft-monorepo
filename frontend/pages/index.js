import { useState } from 'react'
import { gql } from 'graphql-request'
import { fetchAPI, getGlobalFields } from '@/lib/api'
import { SEOMATIC_FRAGMENT } from '@/lib/fragments'
import { Flex, Grid, Button } from '@/components/core'
import { Container } from '@/components/general'
import { CardPost } from '@/components/cards'
import { SectionHero } from '@/components/sections'

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

const Home = ({ page, posts, hasMore }) => {
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
        <>
            <SectionHero
                title="Next + Craft Monorepo"
                image={page?.featuredImage[0]}
            />

            <Container className="py-16 md:py-24">
                {allPosts && (
                    <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {allPosts.map(post => (
                            <CardPost
                                key={post.id}
                                url={`/posts/${post.slug}`}
                                title={post.title}
                                image={post.featuredImage[0]}
                            />
                        ))}
                    </Grid>
                )}

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
        </>
    )
}

export async function getStaticProps({ preview = false, previewData }) {
    const globals = await getGlobalFields(previewData)
    const { page, posts, totalPosts } = await fetchAPI(HOME_QUERY, {
        previewData,
    })

    return {
        props: {
            page,
            posts,
            hasMore: process.env.POSTS_PER_PAGE < totalPosts,
            globals,
            // seo: page.seomatic,
            preview,
        },
        revalidate: 1,
    }
}

export default Home
