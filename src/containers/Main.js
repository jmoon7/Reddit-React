import React, { Component } from 'react'
import Header from '../components/Header'
import Title from '../components/Title'
import Subreddits from '../components/Subreddits'
import PostGrid from './PostGrid'
import PostView from './PostView'
import { fetchFromReddit } from '../utils'

/* 
 * TODO: 
 *		- dynamically render 'post' boxes by listening the browser width/height
 *		- blocks (small image previews) vs cards (facebook-ish big blocks)  
 *				 suggestion: default mobile view -> cards
 *		- size of the blocks based on karma?
 *		- 100 blocks (108x54). The hovered block animates to takes up 4 block spaces, other blocks rearrange themselves
 */

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			subreddit: 'all',
			posts: [],
			searchSuggestions: [],
			nsfw: false,
			postView: null,
			cachePosts: [],
			numPosts: 28
		}
	}

	/* TODO: use fetchFromReddit from utils.js
	 * 		 response.ok else case, add catch
	 */
	fetchPosts() {
		let fetchURL = `https://www.reddit.com/r/${this.state.subreddit}/.json?limit=${this.state.numPosts}`;
		fetchFromReddit('posts', fetchURL).then(response => {
			this.setState({
				posts: response
			});
		});
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

	componentDidMount() {
		this.fetchPosts();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.subreddit !== prevState.subreddit) {
			this.fetchPosts();
		}
	}
	
	render() {
		const posts = this.state.posts.slice(0, this.state.numPosts);

		let toggleViewGrid;
		if (this.state.postView) {
			toggleViewGrid = <PostView post={this.state.postView} handleBackClick={this.handleBackClick.bind(this)} />;
		} else {
			toggleViewGrid = <PostGrid posts={posts} handleClick={this.handlePostClick.bind(this)} nsfw={this.state.nsfw} />;
		}
		
		return (
			<div style={divStyle}>
				<div style={headerStyle}>
	    			<Header handleNSFWClick={this.handleNSFWClick.bind(this)} nsfw={this.state.nsfw} />
				</div>
				<div style={mainStyle}>
					<div style={bannerStyle}>
						<Title />
						<Subreddits currentSubreddit={this.state.subreddit} handleClick={this.handleSubredditClick.bind(this)} />
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

const divStyle = {
	width: '100%',
	height: '100%'
}

const headerStyle = {
	padding: '5px',
}

const mainStyle = {
	textAlign: 'center',
	height: '100%',
}

const bannerStyle = {
	height: '23.5%',
}

const postStyle = {
	height: '76.5%'	
}