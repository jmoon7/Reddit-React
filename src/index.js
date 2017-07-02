/*
 * Commented out the redux stuff
 */


import React from 'react'
import { render } from 'react-dom'
//import { Provider } from 'react-redux'
import App from './App'
//import todoApp from './reducers'
import './App.css'

//let store = createStore(todoApp)

render(
//	<Provider store={store}>
		<App />
//	</Provider>
	,document.getElementById('root')
)


