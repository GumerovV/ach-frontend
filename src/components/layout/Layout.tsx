import React, { FC, PropsWithChildren } from 'react'
import Header from './header/Header'

import styles from './Layout.module.scss'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<main>
			<Header />
			<section className={styles.content}>
				<div className={styles.wrapper}>{children}</div>
			</section>
		</main>
	)
}

export default Layout
