import React, { FC, PropsWithChildren } from 'react'

import styles from './Container.module.scss'
import Divider from '../Divider'

const Container: FC<PropsWithChildren<{ title: String }>> = ({
	children,
	title,
}) => {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<h2>{title}</h2>
				<Divider />
				<div className={styles.content_wrapper}>{children}</div>
			</div>
		</div>
	)
}

export default Container
