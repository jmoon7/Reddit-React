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
			device: 'big',
			subreddit: 'all',
			posts: [],
			searchSuggestions: [],
			nsfw: false,
			postView: null,
			numPosts: 28,
			isLoading: true
		};
		this.handleSubredditClick = this.handleSubredditClick.bind(this);
		this.handleNsfwClick = this.handleNsfwClick.bind(this);
		this.handlePostClick = this.handlePostClick.bind(this);
		this.handleBackClick = this.handleBackClick.bind(this);
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

	handleNsfwClick() {
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
			this.setState({ device: 'small' });
		} else {
			this.setState({ device: 'big' });
		}
	}

	render() {
		let device = this.state.device;
		const headerStyle = (device !== 'small') ? { height: '27%'} : { padding: '5px', height: '18.5%'};
		postStyle = (device !== 'small') ? { ...postStyle, height: '73%'} : { ...postStyle, height: '81.5%'};

		const posts = this.state.posts.slice(0, this.state.numPosts);

		let view;
		if (this.state.isLoading) {
			view = <Loading />;
		} else {
			if (this.state.postView) {
				view = <PostView 
							post={this.state.postView} 
							handleBackClick={this.handleBackClick} 
							device={device}
						/>;
			}
		}

		return (
			<div style={divStyle}>
				<div style={headerStyle}>
		    		<Header 
		    			device={device} 
		    			handleNsfwClick={this.handleNsfwClick} 
		    			nsfw={this.state.nsfw}
		    		/>
					<div style={bannerStyle}>
						<Subreddits 
							currentSubreddit={this.state.subreddit} 
							handleClick={this.handleSubredditClick} 
							device={device}
						/>
					</div>
				</div>
				<div style={postStyle}>
					{ view }
					<PostGrid 
						display={this.state.postView === null} 
						posts={posts} 
						handleClick={this.handlePostClick} 
						nsfw={this.state.nsfw} 
						device={device}
					/>
				</div>
			</div>
		)
	}
}

let divStyle = {
	width: '100%',
	height: '100%',
};
const bannerStyle = {
	textAlign: 'center'
};
let postStyle = {
	textAlign: 'center' 
};

export default Main;