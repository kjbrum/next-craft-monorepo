import classNames from 'classnames'
import { Box } from '@/components/core'

export const ScreenReader = ({ className, ...props }) => (
    <Box
        as="span"
        className={classNames('sr-only', className)}
        css={{
            ':active, :focus, :hover': {
                width: 'auto !important',
                height: 'auto !important',
                overflow: 'visible !important',
                clip: 'auto',
            },
        }}
        {...props}
    />
)

ScreenReader.defaultProps = {
    className: '',
}

export default ScreenReader
