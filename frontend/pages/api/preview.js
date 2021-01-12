import { getEntryPreviewByUri } from '@/lib/api'

export default async (req, res) => {
    const uri = req.query.uri
    const craftPreviewToken = req.query.token
    const craftPreviewHeader =
        req.query['x-craft-preview'] || req.query['x-craft-live-preview']

    // Check for craftPreviewToken and craftPreviewHeader
    if (!craftPreviewHeader) {
        // Redirect to URI if it exists
        if (uri) {
            return res.redirect(`/${uri}`)
        }

        return res.status(401).json({ message: 'Not a preview request.' })
    }

    // Fetch the headless CMS to check if the provided `uri` exists
    // getEntryPreviewByUri would implement the required fetching logic to the headless CMS
    const { entry } = await getEntryPreviewByUri(uri)

    // If the uri doesn't exist prevent preview mode from being enabled
    if (!entry) {
        return res
            .status(401)
            .json({ message: `No entry with the uri "${uri}"` })
    }

    // Check if preview mode is needed (draft)
    if (!craftPreviewToken) {
        return res.redirect(`/${entry.uri === '__home__' ? '' : entry.uri}`)
    }

    // Enable Preview Mode by setting the cookies
    res.setPreviewData(
        {
            previewToken: craftPreviewToken,
        },
        {
            maxAge: 60 * 30, // The preview mode cookies expire in 30 minutes
        }
    )

    // Redirect to the path from the fetched entry
    // We don't redirect to req.query.uri as that might lead to open redirect vulnerabilities
    return res.redirect(`/${entry.uri === '__home__' ? '' : entry.uri}`)
}
