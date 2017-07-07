import React from 'react';
import PropTypes from 'prop-types';
import logoBig from '../resources/reddit.svg';
import logoMobile from '../resources/logo.png';

const propTypes = {
	device: PropTypes.string.isRequired
}

const Title = (props) => {
	let logo, title;
	if (props.device === 'small') {
		style = { ...style,  float: 'right'}
		title = <img src={logoMobile} alt='Reddit' height='25'/>;
		logo = ' reddit react ';
	} else {
		style = { ...style, float: 'none'}
		logo = <img src={logoBig} alt='Reddit' height='70'/>;
		title = 'react'
	}
	return (
		<div style={style}>
			{logo}
			{title}
		</div>
	);	
}

let style = {
	textAlign: 'center',
	fontSize: '20px',
	fontFamily: 'Vag'
};

Title.propTypes = propTypes;

export default Title;