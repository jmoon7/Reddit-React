import React from 'react';
import PropTypes from 'prop-types';
import logoBig from '../resources/reddit.svg';
import logoMobile from '../resources/logo.png';

const Title = (props) => {
	let logo, title;
	// if (props.device === 'mobile') {
		// logo = <img src={logoMobile} alt='Reddit' height='20'/>;
		// title = ' reddit react';
	// } else {
		logo = <img src={logoBig} alt='Reddit' height='70'/>;
		title = 'react'
	// }
	return (
		<div style={style}>
			{logo}
			{title}
		</div>
	);	
}

Title.propTypes = {
	device: PropTypes.string.isRequired
}

export default Title


let style = {
	'fontSize': '20px',
	'fontFamily': 'Vag'
}