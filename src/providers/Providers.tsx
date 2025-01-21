import React, { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import ReduxToastr from 'react-redux-toastr'

const Providers: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Provider store={store}>
			<ReduxToastr
				timeOut={4000}
				newestOnTop={false}
				progressBar
				preventDuplicates
				closeOnToastrClick
				transitionIn={'fadeIn'}
				transitionOut={'fadeOut'}
			/>
			{children}
		</Provider>
	)
}

export default Providers
