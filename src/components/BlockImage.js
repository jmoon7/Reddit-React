import React from 'react';
import PropTypes from 'prop-types';

const BlockImage = (props) => {
	const { src, className, hover, title, nsfw, nsfwShow, width, height, device } = props;

	let overlay, filter, opacity;
	overlay = (hover || (device === 'mobile')) ? 'linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0))' : 'none';
	filter = (nsfw && !nsfwShow) ? 'blur(10px)' : 'none';
	opacity = hover || (src === '') || (device === 'mobile') ? '1' : '0';
	const fontSize = (device === 'mobile') ? '20px' : '15px';

	divStyle = { ...divStyle, backgroundImage: `url(${src})`, width: width, height: height, filter: filter };
	overlayStyle = { ...overlayStyle, width: width, height: height, background: overlay };
	titleStyle = { ...titleStyle, opacity: opacity, fontSize: fontSize};


	return (
		<div>
			<div style={overlayStyle}> </div>
			<div className='blockTitle' style={titleStyle}> {title} </div>
			<div className={className} style={divStyle}> </div>
		</div>
	);	
}

BlockImage.propTypes = {
	src: PropTypes.string.isRequired,
	className: PropTypes.string.isRequired,
	hover: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	nsfw: PropTypes.bool.isRequired,
	nsfwShow: PropTypes.bool.isRequired,
	width: PropTypes.string.isRequired,
	height: PropTypes.string.isRequired,
	device: PropTypes.string.isRequired
};

export default BlockImage

let overlayStyle = {
	position: 'absolute',
	zIndex: '2'
}

let divStyle = {
	zIndex: '1',
	backgroundSize: 'cover',
	backgroundRepeat: 'no-repeat',
};

let titleStyle = {
	margin: '5px',
	fontSize: '15px',
	color: 'white',
	position: 'absolute',
	opacity: '0',
	zIndex: '2',
	transition: '0.2s'
};
