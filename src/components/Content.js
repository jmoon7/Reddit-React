import React from 'react';
import PropTypes from 'prop-types';
import { decodeHTML, roundToThousand, /*getDimensions*/ } from '../utils';
import showdown from 'showdown';

const propTypes = {
	post: PropTypes.object.isRequired,
	handleBackClick: PropTypes.func.isRequired
};

const Content = (props) => {
	const {post, handleBackClick} = props;
	let media;
	// ?
	// let width = getDimensions()[0].toString();
	try {
		// youtube videos, TODO: other media e.g. streamable
		if (post.media && post.media.type === 'youtube.com') {
			let src = 'https://www.youtube.com/embed/' + post.url.slice("https://youtu.be/".length, post.url.length);
			media = <iframe title='youtube' src={src} allowFullScreen frameBorder='0'/>
		} else {
			if (post.preview) {
				let src = post.preview.images[0];
				// check if src is an empty object, i.e. {}
				if (Object.keys(src.variants).length !== 0) {
					src = src.variants.gif.source.url;
					// ?
					media = <iframe title='media' src={src} style={iframeStyle} scrolling="no" width='100%' height='100%'/>
				} else {
					src = decodeHTML(src.source.url);
					media = <img style={imgStyle} src={src} alt='media'/>;
				}
			}
		}
	} catch (e) {
		console.log("PostView: Could not load image");
	}
	
	let body = new showdown.Converter().makeHtml(post.selftext);
	body = { __html: body}
	return (
		<div>
			<div style={infoStyle}>
				<button onClick={handleBackClick} style={buttonStyle} className='backButton'> &#9587; </button>
				<span style={scoreStyle}> {roundToThousand(post.score)} </span>
				<span style={spanStyle}> {'/r/' + post.subreddit} </span> 
				<span style={spanStyle}> <a href={post.url}> link </a> </span>
				<span style={spanStyle}> {post.author} </span>
				{post.gilded !== 0 ? <span style={gildStyle}> &#9733; {post.gilded} </span> : null }
				<span style={spanStyle}> {new Date(post.created_utc*1000).toLocaleString()} </span>
				{post.over_18 ? <span style={nsfwStyle}> NSFW </span> : null }
			</div>
			<div style={titleStyle}> {post.title} </div>
			<div> {media} </div>
			{/* Be careful about XSS attacks? */}
			<div style={bodyStyle}> <div dangerouslySetInnerHTML={body}/> </div>
		</div>
	);	
}

const imgStyle = {
	height: 'auto', 
    width: 'auto',
    maxWidth: '90%',
	margin: 'auto'
}

const iframeStyle = {
	margin: '0',
	padding: '0',
    border: 'none'
}

const titleStyle = {
	margin: '20px',
	fontSize: '25px'
}

const infoStyle = {
	margin: '10px',
	fontSize: '13px'
}

	const buttonStyle = {
		borderRadius: '20px',
		border: 'none',
		cursor: 'pointer'
	}

	const scoreStyle = {
		backgroundColor: '#ff7221',
		color: 'white',
		borderRadius: '15px',
		padding: '3px',
		margin: '10px'
	}

	const spanStyle = {
		color: 'grey',
		margin: '10px'
	}

	const gildStyle = {
		backgroundColor: 'yellow',
		color: 'orange',
		padding: '2px',
		borderRadius: '10px',
		margin: '10px'
	}

	const nsfwStyle = {
		color: 'red',
		margin: '10px'
	}

const bodyStyle = {
	fontSize: '15px',
	margin: '20px'
}

Content.propTypes = propTypes;

export default Content;
