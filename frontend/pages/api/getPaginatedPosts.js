import { getPaginatedPosts } from '@/lib/api'

export default async (req, res) => {
    const { offset, limit } = req.query
    const response = await getPaginatedPosts(parseInt(offset), parseInt(limit))

    res.json(response)
}
