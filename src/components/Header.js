	import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
				<button style={ inputStyle } onClick={ this.loginClick.bind(this) } > LOGIN </button>
				<button	style={ inputStyle } onClick={ this.signupClick.bind(this) } > SIGN UP </button>
				<button style={ nsfwStyle } onClick={ this.nsfwClick.bind(this) } > 18+ </button>
			</div>
		)
	}
}

Header.propTypes = {
	handleNSFWClick: PropTypes.func.isRequired,
	nsfw: PropTypes.bool.isRequired
};

export default Header

const inputStyle = {
	border: 'none',
	backgroundColor: 'transparent',
	fontSize: '15px',
	cursor: 'pointer',
	outline: 'none'	
}