import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Block from '../components/Block';

class PostGrid extends Component {

	render() {
		let { posts, nsfw, device } = this.props;

		posts = posts.map((post, i) => {
			return <Block key={i} post={post} nsfw={nsfw} handleClick={this.props.handleClick} device={device}/>
		});
		
		return <div style={gridStyle}> { posts } </div>;
	}
}

PostGrid.propTypes = {
	posts: PropTypes.arrayOf(PropTypes.object).isRequired,
	handleClick: PropTypes.func.isRequired,
	nsfw: PropTypes.bool.isRequired,
	device: PropTypes.string.isRequired
};

export default PostGrid

const gridStyle = {
	overflowY: 'auto',
	height: '100%'
}