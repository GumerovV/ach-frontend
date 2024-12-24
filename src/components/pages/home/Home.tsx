import React, { FC, useEffect } from 'react'
import CheckList from './checklist/CheckList'
import Events from './events/Events'

import styles from './Home.module.scss'
import Violations from './violations/Violations'
import { connect, disconnect } from '../../../store/websocket/websocket.slice'
import { useDispatch } from 'react-redux'
import VideoStream from '../../ui/video-player/VideoStream'

const Home: FC = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(connect())

		return () => {
			dispatch(disconnect())
		}
	}, [])

	return (
		<div className={styles.wrapper}>
			<VideoStream videoPath={''} />
			<CheckList />
			<Events />
			<Violations />
		</div>
	)
}

export default Home
