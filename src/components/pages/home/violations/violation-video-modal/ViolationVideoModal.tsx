import React, { FC } from 'react'
import {
	Description,
	Dialog,
	DialogPanel,
	DialogTitle,
} from '@headlessui/react'
import { IViolationVideoModal } from './violation-video-modal.interface'
import VideoPlayer from '../../../../ui/video-player/VideoPlayer'

import styles from './ViolationVideoModal.module.scss'
import { MdClose } from 'react-icons/md'

const ViolationVideoModal: FC<IViolationVideoModal> = ({
	isOpen,
	videoPath,
	onClose,
}) => {
	return (
		<Dialog onClose={onClose} open={isOpen} className={styles.modal}>
			<div className={styles.wrapper}>
				<DialogPanel className={styles.modal_wrapper}>
					<MdClose className={styles.close} onClick={onClose} />
					<DialogTitle className={styles.title}>Видео с нарушением</DialogTitle>
					<Description>
						<VideoPlayer videoPath={videoPath} isStream={false} />
					</Description>
				</DialogPanel>
			</div>
		</Dialog>
	)
}

export default ViolationVideoModal
