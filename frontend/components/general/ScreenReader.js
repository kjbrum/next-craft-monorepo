import cx from 'classnames'
import { Box } from '@/components/core'

export const ScreenReader = ({ className, ...props }) => (
    <Box
        as="span"
        className={cx('sr-only focus:not-sr-only', className)}
        {...props}
    />
)

ScreenReader.defaultProps = {
    className: '',
}

export default ScreenReader
