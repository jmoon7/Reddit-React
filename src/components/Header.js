import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Title from './Title'
import github from '../resources/github.png';


class Header extends Component {
	
	loginClick() {

	}
	
	signupClick() {

	}

	nsfwClick() {
		this.props.handleNSFWClick();
	}

	render() {
		let nsfwStyle;
		if (this.props.nsfw) {
			nsfwStyle = { ...inputStyle, color: 'red' };
		} else {
			nsfwStyle = { ...inputStyle, color: 'black' };
		}

		return (
			<div>
				<a href="https://github.com/jmoon7/Reddit-React" style={linkStyle}> 
					<img src={github} alt='GITHUB' height='20' /> 
				</a>
				<button style={ nsfwStyle } onClick={ this.nsfwClick.bind(this) } > 18+ </button>
				<Title device={ this.props.device } />

			</div>
		)
	}
}

Header.propTypes = {
	device: PropTypes.string.isRequired,
	handleNSFWClick: PropTypes.func.isRequired,
	nsfw: PropTypes.bool.isRequired
};

export default Header

const linkStyle = {
	marginLeft: '5px',
    textDecoration: 'none'
}

const inputStyle = {
	border: 'none',
	backgroundColor: 'transparent',
	fontSize: '15px',
	cursor: 'pointer',
	outline: 'none'	
}

/*
<button style={ inputStyle } onClick={ this.loginClick.bind(this) } > LOGIN </button>
<button	style={ inputStyle } onClick={ this.signupClick.bind(this) } > SIGN UP </button>
*/