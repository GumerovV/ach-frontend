import React, { FC } from 'react'
import Logo from '../../../assets/logo.svg'

import styles from './Header.module.scss'
import { MdKeyboardArrowDown, MdLogin } from 'react-icons/md'

const Header: FC = () => {
	return (
		<header className={styles.header}>
			<div className={styles.logo}>
				<img src={Logo} />
				<div></div>
			</div>

			<div className={styles.ach_switcher}>
				<h2>ACH-3</h2>
				<MdKeyboardArrowDown height={32} width={32} />
			</div>

			<div className={styles.profile}>
				<h2>Иванов И. И.</h2>
				<MdLogin />
			</div>
		</header>
	)
}

export default Header
