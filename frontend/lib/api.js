import { GraphQLClient, gql } from 'graphql-request'
import { SEOMATIC_FRAGMENT } from '@/lib/fragments'

export async function fetchAPI(query, { variables = {}, previewData } = {}) {
    const previewToken = previewData?.previewToken || ''

    const graphQLClient = new GraphQLClient(
        `${process.env.NEXT_PUBLIC_CRAFT_DOMAIN}/graphql`,
        {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${process.env.CRAFT_GRAPHQL_TOKEN}`,
                'X-Craft-Token': previewToken,
            },
        }
    )

    const res = await graphQLClient.request(query, variables)

    if (res.errors) {
        console.error(res.errors)
        throw new Error('Failed to fetch API')
    }

    return res
}

export async function getMainNavigation() {
    const data = await fetchAPI(
        gql`
            {
                navigation: entries(section: "mainNavigation") {
                    title
                    ... on mainNavigation_mainNavigation_Entry {
                        linkType
                        internalLink {
                            uri
                        }
                        externalLink
                        openInNewWindow
                    }
                }
            }
        `
    )

    return data
}

export async function getPageByUri(uri, previewData) {
    const data = await fetchAPI(
        gql`
            ${SEOMATIC_FRAGMENT}
            query($uri: [String]) {
                page: entry(section: "pages", uri: $uri) {
                    id
                    title
                    seomatic {
                        ...SeomaticFragment
                    }
                    ... on pages_pages_Entry {
                        featuredImage {
                            ... on uploads_Asset {
                                url
                                alt
                            }
                        }
                    }
                }
            }
        `,
        {
            variables: {
                uri,
            },
            previewData,
        }
    )

    return data
}

export async function getPageUris() {
    const data = await fetchAPI(
        gql`
            {
                pages: entries(section: "pages") {
                    uri
                }
            }
        `
    )

    return data
}

export async function getPostBySlug(slug, previewData) {
    const data = await fetchAPI(
        gql`
            ${SEOMATIC_FRAGMENT}
            query($slug: [String]) {
                post: entry(section: "posts", slug: $slug) {
                    id
                    title
                    seomatic {
                        ...SeomaticFragment
                    }
                    ... on posts_posts_Entry {
                        body
                        featuredImage {
                            ... on uploads_Asset {
                                url
                                alt
                            }
                        }
                    }
                }
            }
        `,
        {
            variables: {
                slug,
            },
            previewData,
        }
    )

    return data
}

export async function getPostSlugs() {
    const data = await fetchAPI(
        gql`
            {
                posts: entries(section: "posts") {
                    slug
                }
            }
        `
    )

    return data
}

export async function getEntryByUri(uri) {
    const data = await fetchAPI(
        gql`
            query($uri: [String]) {
                entry(uri: $uri) {
                    uri
                }
            }
        `,
        {
            variables: {
                uri,
            },
        }
    )

    return data
}

export async function getPaginatedPosts(
    offset = 0,
    limit = process.env.POSTS_PER_PAGE
) {
    const { posts, total } = await fetchAPI(
        gql`
            query($limit: Int, $offset: Int) {
                posts: entries(
                    section: "posts"
                    limit: $limit
                    offset: $offset
                    orderBy: "postDate DESC"
                ) {
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
                total: entryCount(section: "posts")
            }
        `,
        {
            variables: {
                limit,
                offset,
            },
        }
    )

    return {
        posts: posts,
        offset: offset + limit,
        hasMore: offset + limit < total,
    }
}
