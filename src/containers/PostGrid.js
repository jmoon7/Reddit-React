import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Block from '../components/Block';

class PostGrid extends Component {

	render() {
		let { posts, nsfw } = this.props;
		// const length = posts.length;

		posts = posts.map((post, i) => {
			return <Block key={i} post={post} nsfw={nsfw} handleClick={this.props.handleClick} />
		});
		
		return <div> { posts } </div>;
	}
}

PostGrid.propTypes = {
	posts: PropTypes.arrayOf(PropTypes.object).isRequired,
	handleClick: PropTypes.func.isRequired,
	nsfw: PropTypes.bool.isRequired
};

export default PostGrid
