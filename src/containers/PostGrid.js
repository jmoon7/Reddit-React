import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Block from './Block';
import '../scrollbar.css'

const propTypes = {
	posts: PropTypes.arrayOf(PropTypes.object).isRequired,
	handleClick: PropTypes.func.isRequired,
	nsfw: PropTypes.bool.isRequired,
	device: PropTypes.string.isRequired
};

class PostGrid extends Component {

	render() {
		let { display, posts, nsfw, device } = this.props;
		gridStyle = display ? { ...gridStyle, display: 'block' } : { ...gridStyle, display: 'none'};
		posts = posts.map((post, i) => {
			return <Block key={i} post={post} nsfw={nsfw} handleClick={this.props.handleClick} device={device}/>
		});
		
		return <div style={gridStyle} className='scrollbar'> { posts } </div>;
	}
}

let gridStyle = {
	overflowY: 'auto',
	height: '100%',
	display: 'none'
};

PostGrid.propTypes = propTypes;

export default PostGrid;