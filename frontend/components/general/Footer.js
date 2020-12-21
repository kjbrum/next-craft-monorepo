import { Box, Text } from '@/components/core'
import { Container } from '@/components/general'

export const Footer = ({ copyright }) => (
    <Box as="footer" className="py-4 bg-gray-800">
        <Container>
            <Text className="text-center text-white">
                {copyright.replace('{year}', new Date().getFullYear())}
            </Text>
        </Container>
    </Box>
)

Footer.defaultProps = {
    copyright: '',
}

export default Footer
