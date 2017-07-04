import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../transition.css';
import { fetchFromReddit } from '../utils.js';

class SearchBox extends Component {

	constructor(props) {
		super(props);
		this.state = {
			query: '',
			searchSuggestions: []
		}
	}
	
	fetchSearchSuggestions() {
		let fetchURL = `https://www.reddit.com/subreddits/search/.json?q=${this.state.query}?`
		fetchFromReddit('searchSuggestions', fetchURL).then(response => {
			if (this.state.query !== '') {
				this.setState({
					searchSuggestions: response
				});
			}
		});
	}

	handleChange(event) {
		this.setState({ query: event.target.value });
	}

	handleClick(suggestion) {
		this.props.handleSubmit(suggestion)
		this.setState({ 
			query: '',
			searchSuggestions: []
		});	
	}
	
	handleKeyPress(event) {
		if (event.key === 'Enter' && this.state.query !== '') {
			this.props.handleSubmit(this.state.query);
			this.setState({ 
				query: '',
				searchSuggestions: []
			});
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.query !== prevState.query) {
			this.fetchSearchSuggestions();
		}
	}

	render() {
		let suggestions = this.state.searchSuggestions.map((suggestion, i) => {
			return (
				<li key={i} 
					onClick={() => this.handleClick.bind(this)(suggestion)}
					className='suggestion'>
					{suggestion} 
				</li>
			);
		});
		return (
			<div style={divStyle} >
				<input 
					type='text' 
					placeholder='search your subreddit' 
					style={inputStyle}
					value={this.state.query}
					onChange={this.handleChange.bind(this)}
					onKeyPress={this.handleKeyPress.bind(this)} /> 
				<ul style= {listStyle} >
					{suggestions}
				</ul>
			</div>
		);
	}
}

SearchBox.propTypes = {
	handleSubmit: PropTypes.func.isRequired
};

export default SearchBox

const divStyle = {
	width: '200px',
	margin: '10px auto',
	fontSize: '14px',
}

const inputStyle = {
	width: '200px',
	border: '1px solid #ff7221',
	padding: '2px 4px',
	margin: '0',
	outline: 'none',
	fontSize: '14px',
}

const listStyle = {
	position: 'absolute',
	zIndex: '5',
	margin: '0 auto',
	padding: '0 0 0 0',
	width: '210px',
	overflow: 'hidden',
	textAlign: 'left',
	listStyleType: 'none',
	opacity: '0.95',
	backgroundColor: 'white',
	cursor: 'pointer',
	border: 'none'
}