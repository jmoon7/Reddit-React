import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comments from '../components/Comments';
import Content from '../components/Content';
import Loading from '../components/Loading'
import { fetchFromReddit } from '../utils';
import '../transition.css'
import '../scrollbar.css'

class PostView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			comments: [],
			isLoading: true
		}
	}

	fetchComments() {
		const post = this.props.post;
		let fetchURL = `https://www.reddit.com/r/${post.subreddit}/comments/${post.id}.json`;
		fetchFromReddit('comments', fetchURL).then(response => {
			this.setState({
				comments: response,
				isLoading: false
			});
		});
	}

	componentDidMount() {
		this.fetchComments();
	}

	render() {
		const { post, handleBackClick, device } = this.props;
		
		if (device === 'mobile') {
			divStyle = { ...divStyle, overflowY: 'auto', height: '100%', width: '100%' };
			contentStyle = { ...contentStyle, display: 'block', width: '100%', height: 'auto' };
			commentsStyle = { ...commentsStyle, display: 'block', width: '100%', height: 'auto'};
		} else {
			divStyle = { ...divStyle, overflowY: 'hidden', height: '96%', width: '85%' };
			contentStyle = { ...contentStyle, display: 'inline-block', width: '55%', 'height': '100%' };
			commentsStyle = { ...commentsStyle, display: 'inline-block', width: '45%', 'height': '100%' };
		}
		
		let display;
		if (this.state.isLoading) {
			display = <Loading />
		} else {
			display = (
				<div style={{height: '100%'}}>
					<div style={contentStyle} className='scrollbar'>
						<Content post={post} handleBackClick={handleBackClick}/>
					</div>
					<div style={commentsStyle} className='scrollbar'>
						<Comments comments={this.state.comments}/>
					</div>
				</div>
			);
		}

		return (
			<div style={divStyle}> { display } </div>
		);
	}
}

PostView.propTypes = {
	post: PropTypes.object.isRequired,
	handleBackClick: PropTypes.func.isRequired,
	device: PropTypes.string.isRequired
};

export default PostView

let divStyle = {
	display: 'inline-block',
	border: '2px solid #dddddd',
	margin: '0 auto',
}

let contentStyle = {
	display: 'inline-block',
	overflowY: 'auto'
}

let commentsStyle = {
	display: 'inline-block',
	overflowY: 'auto',
	overflowX: 'hidden',
	textAlign: 'left',
}


