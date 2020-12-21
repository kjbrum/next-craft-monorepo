import { getGlobalFields } from '@/lib/api'
import { Heading } from '@/components/core'
import { Container } from '@/components/general'

const Error = ({ statusCode }) => (
    <Container className="text-center py-16 md:py-32">
        <Heading as="h1" variant="display">
            {statusCode && statusCode !== 404
                ? `${statusCode}: An unexpected error has occurred`
                : `Page Not Found`}
        </Heading>
    </Container>
)

export async function getStaticProps({
    res,
    err,
    preview = false,
    previewData,
}) {
    const globals = await getGlobalFields(previewData)
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404

    return {
        props: {
            error: true,
            globals,
            statusCode,
            preview,
        },
    }
}

export default Error
