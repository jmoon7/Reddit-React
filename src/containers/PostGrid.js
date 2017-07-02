import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Block from '../components/Block';

class PostGrid extends Component {

	render() {
		let { posts, nsfw, device } = this.props;
		
		let width = (device === 'mobile') ? '100%' : '200px';
		let height = (device === 'mobile') ? '200px' : '100px';
		let margin = (device === 'mobile') ? '0' : '5px';

		posts = posts.map((post, i) => {
			return <Block key={i} post={post} nsfw={nsfw} handleClick={this.props.handleClick} width={width} height={height} margin={margin}/>
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