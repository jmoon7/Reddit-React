import React from 'react';
import PropTypes from 'prop-types';
import { roundToThousand } from '../utils';
import showdown from 'showdown';

const Comments = (props) => {

	let comments = props.comments.map((comment,i) => { 
		let body = new showdown.Converter().makeHtml(comment.body);
		body = { __html: body}
		return <div style={commentStyle} key={i}> 
					<div style={authorStyle}> 
						{comment.author} {' '}
						<span style={scoreStyle}>
							{roundToThousand(comment.score)}
						</span>
						{comment.stickied ? <span style={stickyStyle}> stickied </span> : null }
						{comment.gilded !== 0 ? <span style={gildStyle}> &#9733; {comment.gilded} </span> : null }
					</div> 
					{' '}
					<div dangerouslySetInnerHTML={body}/> 
				</div> 
	});
	
	return (
		<div style={commentsStyle}>
			{ (comments.length === 0) ? <div style={emptyStyle}> no comments </div> : comments }
		</div>
	);	
}

Comments.propTypes = {
	comments: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Comments

const commentsStyle = {
	display: 'inline-block',
	overflowY: 'scroll',
	overflowX: 'hidden',
	height: '100%',
	width: '45%',
	textAlign: 'left',
}
	const emptyStyle = {
		fontSize: '40px',
		color: '#dddddd',
		textAlign: 'center',
		margin: 'auto'
	}
	
	const commentStyle = {
		borderBottom: '1px solid #dddddd',
		paddingBottom: '10px', 
		fontSize: '13px',
		margin: '10px'
	}
		const authorStyle = {
			color: 'grey',
			fontSize: '11px',
			marginBottom: '2px'
		}
		const scoreStyle = {
			color: '#ff7221'
		}
		const stickyStyle = {
			backgroundColor: 'pink',
			color: 'red',
			padding: '2px',
			borderRadius: '5px',
			marginLeft: '5px'
		}
		const gildStyle = {
			backgroundColor: 'yellow',
			color: 'orange',
			padding: '2px',
			borderRadius: '10px',
			marginLeft: '5px'
		}