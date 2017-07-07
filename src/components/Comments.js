import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { roundToThousand } from '../utils';
import showdown from 'showdown';

const propTypes = {
	comments: PropTypes.arrayOf(PropTypes.object).isRequired
};

class Comments extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	handleMoreComments(comment, i) {
		this.setState({
			[i]: <Comments comments={comment.replies.data.children} />
		});
	}
	render() {
		let comments = this.props.comments.map((comment,i) => { 
			comment = comment.data;
			if (comment.replies) {
				let body = new showdown.Converter().makeHtml(comment.body);
				body = { __html: body}
				return <div style={commentStyle} key={i}> 
							<div style={infoStyle}> 
								{comment.author} {' '}
								<span style={scoreStyle}>
									{roundToThousand(comment.score)}
								</span>
								{comment.stickied ? <span style={stickyStyle}> stickied </span> : null }
								{comment.gilded > 0 ? <span style={gildStyle}> &#9733; {comment.gilded} </span> : null }
							</div> 
							{' '}
							<div style={bodyStyle} dangerouslySetInnerHTML={body}/> 
							<button style={buttonStyle} onClick={() => this.handleMoreComments(comment, i)} >
							replies
							</button>
							{ this.state[i] }
						</div> 
			} else {
				console.log('Comments: no more replies');
				return null;
			}
		});
		
		return (
			<div>
				{ (comments.length === 0) ? <div style={emptyStyle}> no comments </div> : comments }
			</div>
		);	
	}
}

const emptyStyle = {
	fontSize: '40px',
	color: '#dddddd',
	textAlign: 'center',
	margin: 'auto'
}

const commentStyle = {
	borderTop: '1px solid #dddddd',
	paddingTop: '10px', 
	fontSize: '13px',
	margin: '10px'
}
	const infoStyle = {
		color: 'grey',
		fontSize: '11px',
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
	const bodyStyle = {
		margin: '0'
	}
	const buttonStyle = {
		backgroundColor: 'transparent',
		border: 'none',
		color: 'blue'
	}

Comments.propTypes = propTypes;

export default Comments;
