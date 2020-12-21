import { useState } from 'react'
import classNames from 'classnames'
import { getMainNavigation } from '@/lib/api'

import { Container, Layout } from '@/components/general'
import {
    // Base
    Box,
    Flex,
    Grid,
    Text,
    Heading,
    Link,
    Button,
    Image,
    SVG,
    AspectRatio,
    AspectImage,
    Embed,
    // Forms
    Label,
    Input,
    Textarea,
    Select,
    Radio,
    Checkbox,
    Switch,
} from '@/components/core'

const SectionHeading = ({ title, ...props }) => (
    <Heading as="h2" variant="h3" className="mt-12 mb-2" {...props}>
        {title}
    </Heading>
)

const Card = ({ className, children, ...props }) => (
    <Box {...props} className={classNames('p-8', className)}>
        {children}
    </Box>
)

const Patterns = ({ navigation }) => {
    const [switchOn, setSwitchOn] = useState(false)

    return (
        <Layout navigation={navigation}>
            <Container className="py-8 md:py-16">
                <Heading variant="h1" className="mb-12 font-bold text-5xl">
                    Patterns
                </Heading>

                <Heading variant="h1">Base</Heading>

                <hr className="my-4" />

                <SectionHeading title="Box" />
                <Card className="w-full xs:w-1/4 text-xs bg-gray-800 xs:bg-gray-600 md:bg-gray-400 lg:bg-gray-200 xl:bg-gray-200" />
                <Card className="w-full xs:w-1/2 mt-4 text-base bg-gray-200 xs:bg-gray-300 md:bg-gray-500 lg:bg-gray-700 xl:bg-gray-800" />
                <Card className="w-full xs:w-3/4 mt-4 text-xl bg-gray-800 xs:bg-gray-600 md:bg-gray-400 lg:bg-gray-200 xl:bg-gray-200" />
                <Card className="w-full mt-4 text-2xl bg-gray-200 xs:bg-gray-300 md:bg-gray-500 lg:bg-gray-700 xl:bg-gray-800" />

                <SectionHeading title="Flex" />
                <Flex className="flex-wrap -mx-4">
                    {Array(6)
                        .fill(null)
                        .map((item, idx) => (
                            <Box
                                key={idx}
                                className="w-full xxs:w-1/2 md:w-1/3 xl:w-1/6 p-4"
                            >
                                <Box className="w-full pt-full bg-gray-600" />
                            </Box>
                        ))}
                </Flex>

                <SectionHeading title="Grid" />
                <Heading variant="h5" className="pb-2 font-bold">
                    Columns (w/gap)
                </Heading>
                <Grid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <Box className="py-8 bg-gray-500" />
                    <Box className="py-8 bg-gray-500" />
                    <Box className="py-8 bg-gray-500" />
                    <Box className="py-8 bg-gray-500" />
                </Grid>

                <SectionHeading title="Text" />
                <Text as="p">
                    My awesome paragraphs. Austin mustache master cleanse roof
                    party meh irony beard bitters Shoreditch artisan flexitarian
                    synth McSweeney's fap Pinterest lo-fi mixtape twee Truffaut
                    salvia kale chips vinyl you probably haven't heard of them
                    readymade Pitchfork hoodie try-hard scenester PBR&B Brooklyn
                    cred before they sold out YOLO viral dreamcatcher Tonx
                    normcore gluten-free trust fund hella Kickstarter literally
                    Helvetica 90's locavore messenger bag selvage cray four loko
                    yr fanny pack next level authentic typewriter tote bag
                    kitsch High Life iPhone semiotics post-ironic blog seitan
                    biodiesel Cosby sweater gastropub fixie occupy shabby chic
                    chia put a bird on it Banksy squid direct trade banh mi
                    aesthetic vegan Wes Anderson butcher flannel skateboard
                    craft beer asymmetrical tousled actually food truck Bushwick
                    photo booth 3 wolf moon Godard street.
                </Text>
                <Text as="p">
                    Art kogi Intelligentsia Etsy distillery art party selfies
                    plaid pickled Vice sartorial Blue Bottle raw denim jean
                    shorts church-key slow-carb keffiyeh fingerstache Neutra
                    mlkshk whatever Odd Future DIY drinking vinegar crucifix
                    chillwave wolf gentrify paleo banjo polaroid deep v
                    sustainable lomo 8-bit Tumblr Echo Park tofu Thundercats
                    wayfarers chambray stumptown pour-over ethical +1 VHS
                    mumblecore Portland retro ugh heirloom cardigan tattooed
                    bespoke organic pop-up fashion axe leggings Marfa
                    letterpress narwhal cornhole ennui forage farm-to-table pork
                    belly disrupt small batch American Apparel umami meggings
                    XOXO sriracha bicycle rights PBR brunch swag quinoa
                    Williamsburg pug hashtag freegan keytar single-origin coffee
                    Schlitz Carles cliche.
                </Text>

                <SectionHeading title="Heading" />
                <Heading as="h1" variant="display1">
                    Display 1
                </Heading>
                <Heading as="h1" variant="display2">
                    Display 2
                </Heading>
                <Heading as="h1" variant="h1">
                    Heading 1
                </Heading>
                <Heading as="h2" variant="h2">
                    Heading 2
                </Heading>
                <Heading as="h3" variant="h3">
                    Heading 3
                </Heading>
                <Heading as="h4" variant="h4">
                    Heading 4
                </Heading>
                <Heading as="h5" variant="h5">
                    Heading 5
                </Heading>
                <Heading as="h6" variant="h6">
                    Heading 6
                </Heading>

                <SectionHeading title="Link" />
                <Box>
                    <Link href="/patterns">Normal</Link>
                </Box>
                <Box>
                    <Link variant="compact" href="/patterns">
                        Compact Variant
                    </Link>
                </Box>

                <SectionHeading title="Image" />
                <Box className="overflow-hidden w-full">
                    <Box className="w-full md:w-1/2">
                        <Heading variant="h5" className="font-bold">
                            layout="intrinsic"
                        </Heading>
                        <Text className="pb-2 text-sm text-gray-600 leading-tight">
                            Image will scale the dimensions down for smaller
                            viewports but maintain the original dimensions for
                            larger viewports.
                        </Text>
                        <Image
                            src="https://source.unsplash.com/OmEV7k3OniM/1000x600"
                            width={500}
                            height={300}
                        />

                        <Heading variant="h5" className="pt-6 font-bold">
                            layout="fixed"
                        </Heading>
                        <Text className="pb-2 text-sm text-gray-600 leading-tight">
                            Image will set both width and height, and dimensions
                            will not change as the viewport changes.
                        </Text>
                        <Image
                            src="https://source.unsplash.com/OmEV7k3OniM/1000x600"
                            width={1000}
                            height={300}
                            layout="fixed"
                        />

                        <Heading variant="h5" className="pt-6 font-bold">
                            layout="responsive"
                        </Heading>
                        <Text className="pb-2 text-sm text-gray-600 leading-tight">
                            Image will scale the dimensions down for smaller
                            viewports and scale up for larger viewports.
                        </Text>
                        <Image
                            src="https://source.unsplash.com/OmEV7k3OniM/1000x600"
                            width={500}
                            height={300}
                            layout="responsive"
                        />

                        <Heading variant="h5" className="pt-6 font-bold">
                            layout="fill"
                        </Heading>
                        <Text className="pb-2 text-sm text-gray-600 leading-tight">
                            Image will stretch both width and height to the
                            dimensions of the parent element.
                        </Text>
                        <Box
                            className="relative w-full"
                            style={{ height: 150 }}
                        >
                            <Image
                                src="https://source.unsplash.com/OmEV7k3OniM/1000x600"
                                layout="fill"
                            />
                        </Box>
                    </Box>
                </Box>

                <Heading variant="h5" className="pt-6 pb-2 font-bold">
                    Full Width
                </Heading>
                <Box className="relative left-1/2 w-vw transform -translate-x-1/2">
                    <Image
                        src="https://source.unsplash.com/collection/608458/2400x800?2"
                        width={2400}
                        ratio={3 / 1}
                    />
                </Box>

                <SectionHeading title="Button" />
                <Box>
                    <Button>Normal</Button>
                </Box>
                <Box className="mt-2">
                    <Button variant="filled">Primary Variant</Button>
                </Box>
                <Box className="mt-2">
                    <Button variant="outline">Outline Variant</Button>
                </Box>

                <SectionHeading title="SVG" />
                <SVG width="48" height="32" viewBox="0 0 12 8">
                    <path d="M5.293 6.95L6 7.657 11.657 2 10.243.586 6 4.828 1.757.586.343 2z" />
                </SVG>

                <SectionHeading title="AspectRatio" />
                <AspectRatio ratio="3 / 1" className="bg-gray-300">
                    <Box className="flex items-center justify-center">
                        <Heading variant="h2">Aspect Ratio</Heading>
                    </Box>
                </AspectRatio>

                <SectionHeading title="AspectImage" />
                <AspectImage
                    ratio="16 / 9"
                    src="https://source.unsplash.com/collection/608458/1500x1500?2"
                />

                <SectionHeading title="Embed" />
                <Embed src="https://www.youtube.com/watch?v=acHKPu4oIro" />

                <hr className="my-8 md:my-16" />

                <Heading variant="h1">Forms</Heading>

                <SectionHeading title="Label" />
                <Label>Form Input Label</Label>

                <SectionHeading title="Input" />
                <Box className="w-full md:w-1/2">
                    <Input name="input" className="w-full" />
                </Box>

                <SectionHeading title="Date" />
                <Box className="w-full md:w-1/2">
                    <Input name="date" type="date" className="w-full" />
                </Box>

                <SectionHeading title="Select" />
                <Box className="w-full md:w-1/2">
                    <Select defaultValue="option-2" className="w-full">
                        <option value="option-1">Option 1</option>
                        <option value="option-2">Option 2</option>
                        <option value="option-3">Option 3</option>
                    </Select>
                </Box>

                <SectionHeading title="Textarea" />
                <Box className="w-full md:w-1/2">
                    <Textarea name="textarea" className="w-full" />
                </Box>

                <SectionHeading title="Radio" />
                <Box>
                    <Radio
                        name="radio-options"
                        value="option-1"
                        label="Option 1"
                        defaultChecked={true}
                    />
                </Box>
                <Box>
                    <Radio
                        name="radio-options"
                        value="option-2"
                        label="Option 2"
                    />
                </Box>
                <Box>
                    <Radio
                        name="radio-options"
                        value="light"
                        label="Option 3"
                    />
                </Box>

                <SectionHeading title="Checkbox" />
                <Box>
                    <Checkbox name="unchecked" label="Unchecked" />
                </Box>
                <Box>
                    <Checkbox
                        name="checked"
                        label="Checked"
                        defaultChecked={true}
                    />
                </Box>

                <SectionHeading title="Switch" />
                <Box>
                    <Switch
                        checked={switchOn}
                        offLabel="Off"
                        onLabel="On"
                        onClick={() => setSwitchOn(!switchOn)}
                    />
                </Box>
                <Box className="pt-4">
                    <Switch
                        checked={switchOn}
                        onLabel="Enabled"
                        onClick={() => setSwitchOn(!switchOn)}
                    />
                </Box>
            </Container>
        </Layout>
    )
}

export async function getStaticProps() {
    const { navigation } = await getMainNavigation()

    return {
        props: {
            navigation,
        },
        revalidate: 1,
    }
}

export default Patterns
