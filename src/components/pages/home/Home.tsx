import React, { FC, useEffect } from 'react'
import CheckList from './checklist/CheckList'
import Events from './events/Events'
import VideoPlayer from '../../ui/video-player/VideoPlayer'

import styles from './Home.module.scss'
import Violations from './violations/Violations'
import { connect, disconnect } from '../../../store/websocket/websocket.slice'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../hooks/useTypedSelector'

const Home: FC = () => {
	const { isConnected } = useTypedSelector(state => state.websocket)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(connect())

		return () => {
			dispatch(disconnect())
		}
	}, [])

	return (
		<div className={styles.wrapper}>
			<VideoPlayer videoPath={''} />
			<CheckList />
			<Events />
			<Violations />
			<div className='text-font'>
				{isConnected ? <p>True</p> : <p>False</p>}
			</div>
		</div>
	)
}

export default Home
