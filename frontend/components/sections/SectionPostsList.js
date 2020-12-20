import { Grid } from '@/components/core'
import { CardPost } from '@/components/cards'

export const SectionPostsList = ({ posts }) => (
    <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {posts.map(post => (
            <CardPost
                key={post.id}
                url={`/posts/${post.slug}`}
                title={post.title}
                image={post.featuredImage[0]}
            />
        ))}
    </Grid>
)

SectionPostsList.defaultProps = {
    posts: [],
}

export default SectionPostsList
