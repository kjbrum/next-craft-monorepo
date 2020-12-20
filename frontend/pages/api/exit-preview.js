export default async (req, res) => {
    // Exit the current user from "Preview Mode".
    res.clearPreviewData()

    // Redirect the user back to the page they were on.
    res.writeHead(307, { Location: req.headers.referer }).end()
}
