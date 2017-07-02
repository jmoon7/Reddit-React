import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BlockImage from './BlockImage';
import '../transition.css';
import { decodeHTML } from '../utils';

class Block extends Component {
	constructor(props) {
		super(props);
		this.state = {
			url: '',
			imgLoaded: false,
			hover: false,
			noImg: false
		};
	}

	setImageURL() {
		const post = this.props.post;
		let res, url;
		try {
			res = post.preview.images[0].resolutions;
			url = (res.length <=2 ) ? res[res.length - 1].url : res[2].url; 
			url = decodeHTML(url);
			this.setState({ url: url });
		} catch (e) {
			console.log('Block: could not load image');
		}
	}

	trimTitle(title) {
		if (title.length > 70) {
			return title.slice(0, 70) + "...";
		}
		return title
	}

	handleMouseOver() {
		this.setState({ hover: true });
	}

	handleMouseOut() {
		this.setState({ hover: false });
	}

	componentWillMount() {
		this.setImageURL();
	}
	
	componentDidMount() {
		var img = new window.Image();
		img.onload = () => { 
			this.setState({ imgLoaded: true }) 
		};
		img.src = this.state.url;
	}

	render() {
		const { post, nsfw } = this.props;
		let imageLoad = 'imageLoading';
		if (this.state.imgLoaded) {
			imageLoad += ' imageLoaded';			
		}

		return (
			<span style={spanStyle} 
				onMouseOver={this.handleMouseOver.bind(this)} 
				onMouseOut={this.handleMouseOut.bind(this)} 
				onClick={() => this.props.handleClick(post)} >

				<BlockImage
					src={this.state.url}
					className={imageLoad} 
					hover={this.state.hover}
					title={this.trimTitle(post.title)}
					score={post.score}
					nsfw={post.over_18}
					nsfwShow={nsfw}
				 />

			</span>

		)
	}
}

Block.propTypes = {
	post: PropTypes.object.isRequired,
	nsfw: PropTypes.bool.isRequired,
	handleClick: PropTypes.func.isRequired
};

export default Block


let spanStyle = {
	position: 'relative',
	display: 'inline-block',
	overflow: 'hidden',
	backgroundColor: '#bbbbbb',
	borderStyle: 'none',
	margin: '5px',
	cursor: 'pointer'
};