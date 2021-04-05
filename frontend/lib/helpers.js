import parse, { attributesToProps, domToReact } from 'html-react-parser'
import { Box, Heading, Link, Image, Embed } from '@/components/core'

// Retrieve a key value from an object
export function get(object, key) {
    var keys = key.split('.')

    for (var i = 0; i < keys.length; i++) {
        if (!object.hasOwnProperty(keys[i])) {
            return null
        }
        object = object[keys[i]]
    }

    return object
}

// Remove/get margin values from className
const MRE = /m[trblxy]?-/
export const getClasses = test => className => {
    return className
        ? className
              .split(' ')
              .filter(Boolean)
              .filter(x => test(x.trim() || ''))
              .join(' ')
        : ''
}
export const getMargin = getClasses(k => MRE.test(k))
export const omitMargin = getClasses(k => !MRE.test(k))

// Replace the front-end URL with our CMS URL for uploads
export const parseUploadUrls = text => {
    const regex = new RegExp(
        `${process.env.NEXT_PUBLIC_CRAFT_PRIMARY_SITE_URL}/uploads`,
        'gi'
    )
    return (
        text &&
        text.replace(regex, `${process.env.NEXT_PUBLIC_CRAFT_DOMAIN}/uploads`)
    )
}

// Turn HTML tags into React components
export const parseRedactor = (content, options = {}) => {
    return parse(content, {
        replace: ({ attribs, name, children }) => {
            if (!attribs) return
            const props = attributesToProps(attribs)

            // img
            if (name === 'img') {
                return (
                    <Box
                        css={{
                            'div, img': {
                                position: 'static !important',
                                width: 'auto !important',
                                height: 'auto !important',
                                padding: '0 !important',
                            },
                        }}
                    >
                        <Image
                            {...props}
                            layout="responsive"
                            sizes="(min-width: 1440px) 1440px, 100vw"
                            width={1440}
                            {...options?.img}
                        />
                    </Box>
                )
            }

            // a
            if (name === 'a') {
                return (
                    <Link {...props} {...options?.a}>
                        {domToReact(children)}
                    </Link>
                )
            }

            // h[1-6]
            if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(name)) {
                return (
                    <Heading
                        as={name}
                        variant={name}
                        {...props}
                        {...options?.[name]}
                    >
                        {domToReact(children)}
                    </Heading>
                )
            }

            // iframe
            if (name === 'iframe') {
                delete props['style']
                return <Embed {...props} {...options?.iframe} />
            }
        },
    })
}

// Parse YouTube or Vimeo URLs
export const parseVideoUrl = {
    parse: function (url) {
        // - Supported YouTube URL formats:
        //   - http://www.youtube.com/watch?v=My2FRPA3Gf8
        //   - http://youtu.be/My2FRPA3Gf8
        //   - https://youtube.googleapis.com/v/My2FRPA3Gf8
        // - Supported Vimeo URL formats:
        //   - http://vimeo.com/25451551
        //   - http://player.vimeo.com/video/25451551
        // - Also supports relative URLs:
        //   - //player.vimeo.com/video/25451551

        const parts = url.match(
            /(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
        )

        let type = 'other'
        let allow = null
        if (parts) {
            if (parts[3].indexOf('youtu') > -1) {
                type = 'youtube'
                allow =
                    'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            } else if (parts[3].indexOf('vimeo') > -1) {
                type = 'vimeo'
                allow = 'autoplay; fullscreen'
            }
        }

        return {
            type,
            url,
            id: type === 'other' ? null : parts[6],
            allow,
        }
    },

    // Returns an embed URL
    createEmbed: function (url) {
        const parsedUrl = this.parse(url)

        if (parsedUrl.type == 'youtube') {
            return '//www.youtube.com/embed/' + parsedUrl.id
        } else if (parsedUrl.type == 'vimeo') {
            return '//player.vimeo.com/video/' + parsedUrl.id
        }

        return parsedUrl.url
    },

    // Returns a thumbnail image
    getThumbnail: function (url) {
        const parsedUrl = this.parse(url)
        let thumbUrl

        switch (parsedUrl.type) {
            case 'youtube':
                thumbUrl =
                    '//img.youtube.com/vi/' +
                    parsedUrl.id +
                    '/maxresdefault.jpg'
                break
            case 'vimeo':
                thumbUrl = '//i.vimeocdn.com/video/' + parsedUrl.id + '_640.jpg'
                break
            default:
                thumbUrl = ''
                break
        }

        return thumbUrl
    },
}

// Convert a string to kebabcase
export const toKebabCase = (str = '') => {
    return str
        .match(
            /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
        )
        .map(x => x.toLowerCase())
        .join('-')
}

// Truncate a string, without cutting off words
export const truncate = (str, max = 100, more = '...') => {
    if (str.length > max) {
        let trimmedString = str.substr(0, max)

        // Re-trim to avoid word cutoff
        trimmedString = trimmedString.substr(
            0,
            Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
        )

        return `${trimmedString}${more}`
    }

    return str
}


// Throttle a function
export const throttle = (func, delay) => {
    let inProgress = false
    return (...args) => {
        if (inProgress) return
        inProgress = true

        setTimeout(() => {
            func(...args)
            inProgress = false
        }, delay)
    }
}
