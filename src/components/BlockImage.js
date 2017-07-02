import React from 'react';
import PropTypes from 'prop-types';

const BlockImage = (props) => {
	const { src, className, hover, title, nsfw, nsfwShow, width, height } = props;


	divStyle = { ...divStyle, backgroundImage: `url(${src})`, width: width, height: height }

	let filter, opacity;
	filter = (hover || (nsfw && !nsfwShow)) ? 'blur(5px)' : 'none'
	opacity = hover || (src === '') ? '1' : '0'
	divStyle = { ...divStyle, filter: filter};
	titleStyle = { ...titleStyle, opacity: opacity};



	return (
		<div>
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
	height: PropTypes.string.isRequired
};

export default BlockImage

let divStyle = {
	zIndex: '1',
	// height: '100px',
	// width: '200px',
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
