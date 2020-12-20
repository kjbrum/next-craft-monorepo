import classNames from 'classnames'
import { Box } from '@/components/core'
import { parseRedactor } from '@/lib/helpers'

export const Prose = ({ className, parseOptions, children, ...props }) => (
    <Box className={classNames('prose', className)} {...props}>
        {parseRedactor(children, parseOptions)}
    </Box>
)

Prose.defaultProps = {
    className: '',
    parseOptions: {},
    children: null,
}

export default Prose
