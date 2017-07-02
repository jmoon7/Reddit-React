import React, { Component } from 'react'
import Header from '../components/Header'
import Title from '../components/Title'
import Subreddits from '../components/Subreddits'
import PostGrid from './PostGrid'
import PostView from './PostView'
import { fetchFromReddit, getDimensions } from '../utils'

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: 0,
			subreddit: 'all',
			posts: [],
			searchSuggestions: [],
			nsfw: false,
			postView: null,
			cachePosts: [],
			numPosts: 28
		}
	}

	fetchPosts() {
		let fetchURL = `https://www.reddit.com/r/${this.state.subreddit}/.json?limit=${this.state.numPosts}`;
		fetchFromReddit('posts', fetchURL).then(response => {
			this.setState({
				posts: response
			});
		});
	}

	setDimensions() {
		this.setState({ width: getDimensions()[0] })
	}

	handleNSFWClick() {
		this.setState({
			nsfw: !this.state.nsfw
		})
	}

	handleSubredditClick(subreddit) {
		if (this.state.subreddit !== subreddit) {
			this.setState({
				subreddit: subreddit,
				posts: [],
				postView: null
			});
		}
	}

	handlePostClick(post) {
		this.setState({
			cachePosts: this.state.posts,
			posts: [],
			postView: post
		});	
	}

	handleBackClick() {
		this.setState({
			posts: this.state.cachePosts,
			postView: null
		})
	}

	componentWillMount() {
		this.setDimensions();
	}

	componentDidMount() {
		window.addEventListener('resize', this.setDimensions.bind(this));
		this.fetchPosts();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.subreddit !== prevState.subreddit) {
			this.fetchPosts();
		}
	}
	
	render() {
		let device = 'desktop';
		if (this.state.width < 700) {
			device = 'mobile';
		} else {
		}

		const posts = this.state.posts.slice(0, this.state.numPosts);

		let toggleViewGrid;
		if (this.state.postView) {
			toggleViewGrid = <PostView post={this.state.postView} handleBackClick={this.handleBackClick.bind(this)} device={device}/>;
		} else {
			toggleViewGrid = <PostGrid posts={posts} handleClick={this.handlePostClick.bind(this)} nsfw={this.state.nsfw} device={device}/>;
		}
		
		return (
			<div style={divStyle}>
			<div style={headerStyle}>
	    		<Header handleNSFWClick={this.handleNSFWClick.bind(this)} nsfw={this.state.nsfw} />
			</div>
				<div style={centerStyle}>
					<div style={bannerStyle}>
						<Title device={device} />
						<Subreddits currentSubreddit={this.state.subreddit} handleClick={this.handleSubredditClick.bind(this)} device={device} />
					</div>
					<div style={postStyle}>
					{ toggleViewGrid }
					</div>
				</div>
			</div>
		)
	}
}

export default Main

let divStyle = {
	width: '100%',
	height: '100%'
}

const headerStyle = {
	padding: '5px',
	height: '2%',
}
const centerStyle = {
	textAlign: 'center',
	height: '98%'
}
const bannerStyle = {
	height: '24%',
}
const postStyle = {
	height: '76%'
}