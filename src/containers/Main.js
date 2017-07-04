import React, { Component } from 'react'
import Header from '../components/Header'
import Subreddits from '../components/Subreddits'
import PostGrid from './PostGrid'
import PostView from './PostView'
import Loading from '../components/Loading'
import { fetchFromReddit, getDimensions } from '../utils'

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			device: 'desktop',
			subreddit: 'all',
			posts: [],
			searchSuggestions: [],
			nsfw: false,
			postView: null,
			numPosts: 28,
			isLoading: true
		}
	}

	fetchPosts() {
		let fetchURL = `https://www.reddit.com/r/${this.state.subreddit}/.json?limit=${this.state.numPosts}`;
		fetchFromReddit('posts', fetchURL).then(response => {
			this.setState({
				posts: response,
				isLoading: false
			});
		});
	}

	setDimensions() {
		if (getDimensions()[0] < 700) {
			this.setState({ device: 'mobile' });
		} else {
			this.setState({ device: 'desktop' });
		}
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
			postView: post
		});	
	}

	handleBackClick() {
		this.setState({
			postView: null
		});
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
		let device = this.state.device;
		const headerStyle = (device !== 'mobile') ? { height: '27%'} : { padding: '5px', height: '18.5%'};
		postStyle = (device !== 'mobile') ? { ...postStyle, height: '73%'} : { ...postStyle, height: '81.5%'};

		const posts = this.state.posts.slice(0, this.state.numPosts);

		let toggleViewGrid;
		if (this.state.isLoading) {
			toggleViewGrid = <Loading />
		} else {
			if (this.state.postView) {
				toggleViewGrid = <PostView post={this.state.postView} handleBackClick={this.handleBackClick.bind(this)} device={device}/>;
			}
		}
		
		return (
			<div style={divStyle}>
				<div style={headerStyle}>
		    		<Header device={device} handleNSFWClick={this.handleNSFWClick.bind(this)} nsfw={this.state.nsfw} />
					<div style={bannerStyle}>
						<Subreddits currentSubreddit={this.state.subreddit} handleClick={this.handleSubredditClick.bind(this)} device={device} />
					</div>
				</div>
				<div style={postStyle}>
					{ toggleViewGrid }
					<PostGrid posts={posts} handleClick={this.handlePostClick.bind(this)} nsfw={this.state.nsfw} device={device}/>;
				</div>
			</div>
		)
	}
}

export default Main

let divStyle = {
	width: '100%',
	height: '100%',
}
const bannerStyle = {
	textAlign: 'center'
}
let postStyle = {
	textAlign: 'center' 
};
