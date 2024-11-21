import React, { FC, PropsWithChildren } from 'react'
import { IButton } from './button.interface'

import styles from './Button.module.scss'
import classNames from 'classnames'

const Button: FC<PropsWithChildren<IButton>> = ({
	children,
	className,
	...rest
}) => {
	return (
		<button className={classNames(styles.button, className)} {...rest}>
			{children}
		</button>
	)
}

export default Button
