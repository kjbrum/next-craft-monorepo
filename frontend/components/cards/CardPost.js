import { Box, Link, Heading, Text, Image } from '@/components/core'

export const CardPost = ({ url, title, image, saved }) => (
    <Box
        as="article"
        className="bg-white shadow-md translate-y-0 transform hover:-translate-y-0.5 hover:shadow-lg focus-within:-translate-y-0.5 focus-within:shadow-lg transition"
    >
        <Link
            href={url}
            className="group block overflow-hidden h-full rounded focus:ring"
        >
            {image && (
                <Image
                    src={image.url}
                    alt={image.title}
                    width={600}
                    ratio={3 / 2}
                    layout="responsive"
                />
            )}

            <Box className="px-4 py-3 md:p-6">
                <Heading
                    as="h2"
                    variant="h3"
                    className="font-bold leading-none group-hover:text-gray-600 group-focus:text-gray-600 transition-colors"
                >
                    {title}
                </Heading>
                {saved && (
                    <Text className="pt-2 uppercase text-sm font-bold">
                        ✅ Saved
                    </Text>
                )}
            </Box>
        </Link>
    </Box>
)

export default CardPost
