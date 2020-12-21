import { Box, Flex, Link } from '@/components/core'
import { Container } from '@/components/general'

export const Header = ({ navigation }) => (
    <Box as="header" className="py-6 bg-gray-800">
        <Flex as={Container} className="content-between items-center">
            <Box className="flex-grow">
                <Link href="/" className="text-white font-bold">
                    Next + Craft
                </Link>
            </Box>

            <Box as="nav">
                <Flex as="ul" className="space-x-4">
                    {navigation.map(({ id, title, navLink: [navLink] }) => (
                        <Box key={id} as="li">
                            <Link
                                href={
                                    navLink.typeHandle === 'internalLink'
                                        ? `/${navLink.internalLink[0].uri}`
                                        : navLink.externalLink
                                }
                                target={navLink.openInNewWindow ? '_blank' : ''}
                                className="text-white hover:underline focus:underline"
                            >
                                {title}
                            </Link>
                        </Box>
                    ))}
                </Flex>
            </Box>
        </Flex>
    </Box>
)

Header.defaultProps = {
    navigation: [],
}

export default Header
