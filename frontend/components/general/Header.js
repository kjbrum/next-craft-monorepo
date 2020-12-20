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
                <Flex as="ul">
                    {navigation.map((navItem, idx) => (
                        <Box key={idx} as="li" className="mr-auto pr-4">
                            <Link
                                href={
                                    navItem.linkType === 'internal'
                                        ? `/${navItem.internalLink[0].uri}`
                                        : navItem.externalLink
                                }
                                target={navItem.openInNewWindow ? '_blank' : ''}
                                className="text-white hover:text-gray-200 transition"
                            >
                                {navItem.title}
                            </Link>
                        </Box>
                    ))}

                    <Box as="li">
                        <Link
                            href="/patterns"
                            className="text-white hover:text-gray-200 transition"
                        >
                            Patterns
                        </Link>
                    </Box>
                </Flex>
            </Box>
        </Flex>
    </Box>
)

Header.defaultProps = {
    navigation: [],
}

export default Header
