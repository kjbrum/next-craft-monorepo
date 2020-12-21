import Error from '@/pages/_error'
import { getGlobalFields } from '@/lib/api'

const Custom404 = () => <Error statusCode={404} />

export async function getStaticProps({ preview = false, previewData }) {
    const globals = await getGlobalFields(previewData)

    return {
        props: {
            error: true,
            globals,
            preview,
        },
    }
}

export default Custom404
