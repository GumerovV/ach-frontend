import React, { FC } from 'react'
import CheckList from './checklist/CheckList'
import Events from './events/Events'
import VideoPlayer from '../../ui/video-player/VideoPlayer'

import styles from './Home.module.scss'
import Violations from './violations/Violations'

const Home: FC = () => {
	return (
		<div className={styles.wrapper}>
			<VideoPlayer videoPath={''} />
			<CheckList />
			<Events />
			<Violations />
		</div>
	)
}

export default Home
