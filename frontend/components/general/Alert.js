import cx from 'classnames'
import { Box } from '@/components/core'

export const Alert = ({ className, ...props }) => (
    <Box
        as="a"
        className={cx(
            'block w-full px-4 py-2 text-center text-white bg-gray-900',
            className
        )}
        {...props}
    />
)

Alert.defaultProps = {
    className: '',
}

export default Alert
