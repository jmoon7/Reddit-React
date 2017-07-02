import React from 'react'
import logo from '../resources/reddit.svg'

const Title = () => {
	return (
		<div style={style}>
			<img src={logo} alt='Reddit' height='70'/>
			react
		</div>
	);	
}

export default Title


let style = {
	'fontSize': '20px',
	'fontFamily': 'Vag'
}