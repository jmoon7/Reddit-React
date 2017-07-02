import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comments from '../components/Comments';
import Content from '../components/Content';
import { fetchFromReddit } from '../utils';
import '../transition.css'

class PostView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			comments: []
		}
	}

	fetchComments() {
		const post = this.props.post;
		let fetchURL = `https://www.reddit.com/r/${post.subreddit}/comments/${post.id}.json`;
		fetchFromReddit('comments', fetchURL).then(response => {
			this.setState({
				comments: response
			});
		});
	}

	componentDidMount() {
		this.fetchComments();
	}

	render() {
		const { post, handleBackClick } = this.props;

		return (
			<div style={divStyle}>
				<button onClick={handleBackClick} style={buttonStyle} className='backButton'> &#9587; </button>
				<Content post={post}/>
				<Comments comments={this.state.comments}/>			
			</div>
		)
	}
}

PostView.propTypes = {
	post: PropTypes.object.isRequired,
	handleBackClick: PropTypes.func.isRequired
};

export default PostView

const buttonStyle = {
	position: 'absolute',
	// hmmmm hacky
	top: '28%',
	left: '13%',
	borderRadius: '20px',
	border: 'none',
	cursor: 'pointer'
}

const divStyle = {
	display: 'inline-block',
	border: '2px solid #dddddd',
	width: '75%',
	height: '90%',
	margin: '0 auto'
}


