import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBox from './SearchBox';
import '../transition.css'

class Subreddits extends Component {

	constructor(props) {
		super(props);
		this.popularSubreddits = ['all', 'funny', 'pics', 'IAmA', 'gaming', 'videos', 'movies', 'earthporn', 'wallpapers', 'todayilearned', 'science', ];
	}

	render() {
		let subreddits = this.popularSubreddits.map((subreddit, i) => {
			return ( 
				<button key={i} 
						style={buttonStyle} 
						className='subredditButton'
						type='button' 
						onClick={() => this.props.handleClick(subreddit)}> 

						{ subreddit.toLowerCase() } 
				</button>
			);
		});
		return (
			<div style={divStyle}> 
				<div style={currentSubredditStyle}>
					{ `/r/${this.props.currentSubreddit}` } 
				</div>
				<SearchBox handleSubmit={this.props.handleClick} />
				{ subreddits }
			</div>
		)
	}
}

Subreddits.propTypes = {
	currentSubreddit: PropTypes.string.isRequired,
	handleClick: PropTypes.func.isRequired
};

export default Subreddits


const divStyle = {
	textAlign: 'center'
}

const buttonStyle = {
	marginLeft: '10px',
	fontSize: '15px',
	color: 'gray',
	border: 'none',
	backgroundColor: 'transparent',
	cursor: 'pointer',
	outline: 'none'
}

const currentSubredditStyle = {
	letterSpacing: '1px',
	marginBottom: '5px',
	fontSize: '25px'

}