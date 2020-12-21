import classNames from 'classnames'
import { Box, Flex, Link, Text, Heading, Image } from '@/components/core'
import { Container } from '@/components/general'

export const SectionHero = ({ title, actionLink, actionText, image }) => (
    <Box className="overflow-hidden relative bg-gray-200">
        <Box className="max-w-screen-2xl mx-auto">
            <Box className="relative w-auto lg:w-1/2 lg:max-w-160 py-8 sm:py-16 md:py-20 lg:py-24 xl:py-32 bg-gray-200 z-10">
                <Flex
                    as={Container}
                    className="justify-center items-center lg:min-h-96"
                >
                    <Box className="w-full sm:text-center lg:text-left">
                        {actionLink && actionText && (
                            <Link
                                href={actionLink}
                                className="inline-block mb-4"
                            >
                                {actionText}
                            </Link>
                        )}

                        {title && (
                            <Heading
                                as="h1"
                                variant="display"
                                className="tracking-tight leading-snug sm:leading-none font-extrabold text-gray-900"
                            >
                                {title}
                            </Heading>
                        )}
                    </Box>
                </Flex>
            </Box>
        </Box>

        {image && (
            <Box className="relative lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 h-56 sm:h-80 md:h-96 lg:h-full z-20">
                <Image
                    src={image.url}
                    alt={image.title}
                    priority={true}
                    layout="fill"
                    className="object-cover"
                />
            </Box>
        )}
    </Box>
)

SectionHero.defaultProps = {
    title: '',
    actionLink: '',
    actionText: '',
    image: null,
}

export default SectionHero
