import React, { Children, FC, PropsWithChildren, useState } from 'react'

import styles from './Carousel.module.scss'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { BsDot } from 'react-icons/bs'

const Carousel: FC<PropsWithChildren> = ({ children }) => {
	const [curIndex, setCurIndex] = useState<number>(0)

	const next = () => {
		setCurIndex(index =>
			index === Children.toArray(children).length - 1 ? 0 : index + 1,
		)
	}

	const prev = () => {
		setCurIndex(index =>
			index === 0 ? Children.toArray(children).length - 1 : index - 1,
		)
	}

	return (
		<div className={styles.carousel}>
			<div
				className={styles.items}
				style={{
					transform: `translateX(calc(-${curIndex * 100}% - ${curIndex}*1rem))`,
				}}
			>
				{children}
			</div>
			<div className={styles.actions}>
				<button onClick={prev}>
					<BiChevronLeft />
				</button>
				<div className={styles.dots}>
					{Children.toArray(children).map((_, i) => (
						<BsDot
							key={i}
							className={curIndex === i ? styles.active : ''}
							onClick={() => setCurIndex(i)}
						/>
					))}
				</div>
				<button onClick={next}>
					<BiChevronRight />
				</button>
			</div>
		</div>
	)
}

export default Carousel
