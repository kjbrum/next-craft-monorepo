import { forwardRef } from 'react'
import cx from 'classnames'
import { Box } from '@/components/core'
import { getMargin, omitMargin } from '@/lib/helpers'

export const Label = forwardRef((props, ref) => (
    <Box
        ref={ref}
        as="label"
        // __variantKey="forms.label"
        {...props}
    />
))
Label.displayName = 'Label'

export const Input = forwardRef(({ className, ...props }, ref) => (
    <Box
        ref={ref}
        as="input"
        type="text"
        // __variantKey="forms.input"
        className={cx('rounded focus:border-gray-500', className)}
        {...props}
    />
))
Input.displayName = 'Input'

export const Textarea = forwardRef(({ className, ...props }, ref) => (
    <Box
        ref={ref}
        as="textarea"
        // __variantKey="forms.textarea"
        className={cx('rounded focus:border-gray-500', className)}
        {...props}
    />
))
Textarea.displayName = 'Textarea'

export const Select = forwardRef(({ className, ...props }, ref) => (
    <Box
        ref={ref}
        as="select"
        // __variantKey="forms.select"
        className={cx('rounded focus:border-gray-500', className)}
        {...props}
    />
))
Select.displayName = 'Select'

export const Radio = forwardRef(
    ({ label, labelClassName, className, ...props }, ref) => (
        <>
            {label ? (
                <Label
                    className={cx('inline-flex items-center', labelClassName)}
                >
                    <Box
                        ref={ref}
                        as="input"
                        type="radio"
                        // __variantKey="forms.radio"
                        className={cx(
                            'text-gray-700 focus:ring-offset-0',
                            className
                        )}
                        {...props}
                    />
                    <Box as="span" className="pl-2">
                        {label}
                    </Box>
                </Label>
            ) : (
                <Box
                    ref={ref}
                    as="input"
                    type="radio"
                    // __variantKey="forms.radio"
                    className={cx(
                        'text-gray-700 focus:ring-offset-0',
                        className
                    )}
                    {...props}
                />
            )}
        </>
    )
)
Radio.displayName = 'Radio'

export const Checkbox = forwardRef(
    ({ label, labelClassName, className, ...props }, ref) => (
        <>
            {label ? (
                <Label
                    className={cx('inline-flex items-center', labelClassName)}
                >
                    <Box
                        ref={ref}
                        as="input"
                        type="checkbox"
                        // __variantKey="forms.checkbox"
                        className={cx(
                            'text-gray-700 rounded focus:ring-offset-0',
                            className
                        )}
                        {...props}
                    />
                    <Box as="span" className="pl-2">
                        {label}
                    </Box>
                </Label>
            ) : (
                <Box
                    ref={ref}
                    as="input"
                    type="checkbox"
                    // __variantKey="forms.checkbox"
                    className={cx(
                        'text-gray-700 focus:ring-offset-0',
                        className
                    )}
                    {...props}
                />
            )}
        </>
    )
)
Checkbox.displayName = 'Checkbox'

export const Switch = forwardRef(
    (
        {
            checked,
            onLabel,
            offLabel,
            labelClassName,
            className,
            onClick,
            ...props
        },
        ref
    ) => (
        <>
            {onLabel || offLabel ? (
                <Label
                    className={cx('inline-flex items-center', labelClassName)}
                >
                    {offLabel && (
                        <Box as="span" className="pr-2">
                            {offLabel}
                        </Box>
                    )}

                    <Box
                        ref={ref}
                        as="button"
                        type="button"
                        role="switch"
                        // __variantKey="forms.switch"
                        onClick={onClick}
                        role="checkbox"
                        aria-checked={checked}
                        aria-label="Toggle switch"
                        className={cx(
                            'appearance-none w-12 h-6 m-0 p-0 bg-current rounded-full transition-colors',
                            checked ? 'text-gray-700' : 'text-gray-300',
                            getMargin(className)
                        )}
                        {...props}
                    >
                        <Box
                            aria-hidden={true}
                            className={cx(
                                'w-6 h-6 rounded-full border-2 border-current bg-white transform transition-transform',
                                checked ? 'translate-x-full' : 'translate-x-0',
                                omitMargin(className)
                            )}
                        />
                    </Box>

                    {onLabel && (
                        <Box as="span" className="pl-2">
                            {onLabel}
                        </Box>
                    )}
                </Label>
            ) : (
                <Box
                    ref={ref}
                    as="button"
                    type="button"
                    role="switch"
                    // __variantKey="forms.switch"
                    onClick={onClick}
                    role="checkbox"
                    aria-checked={checked}
                    aria-label="Toggle switch"
                    className={cx(
                        'appearance-none w-12 h-6 m-0 p-0 bg-current rounded-full transition-colors',
                        checked ? 'text-gray-700' : 'text-gray-500',
                        getMargin(className)
                    )}
                    {...props}
                >
                    <Box
                        aria-hidden={true}
                        className={cx(
                            'w-6 h-6 rounded-full border-2 border-current bg-white transform transition-transform',
                            checked ? 'translate-x-full' : 'translate-x-0',
                            omitMargin(className)
                        )}
                    />
                </Box>
            )}
        </>
    )
)
Switch.displayName = 'Switch'
