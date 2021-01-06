import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import cx from 'classnames'

export const Icon = ({ name, className, ...props }) => {
    const Icon = dynamic(() =>
        import(`!!@svgr/webpack!@/icons/icon-${name}.svg`)
    )
    return (
        <Icon
            className={cx('fill-current', className)}
            aria-hidden={true}
            {...props}
        />
    )
}

Icon.propTypes = {
    name: PropTypes.oneOf(['close']).isRequired,
}

Icon.defaultProps = {}

export default Icon
