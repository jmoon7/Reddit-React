export const getDimensions = () => {
    // Adapted from StackOverflow
    let w, d, e, g, width, height;
    w = window;
    d = document;
    e = d.documentElement;
    g = d.getElementsByTagName('body')[0];
    width = g.clientWidth ||  e.clientWidth || w.innerWidth;
    height = g.clientHeight || e.clientHeight || w.innerHeight;
    return [width, height];
}

export const decodeHTML = (input) => {
    let temp = document.createElement("textarea");
    temp.innerHTML = input;
    return temp.value;
}

export const roundToThousand = (number) => {
	if (number >= 1000) {
		number = (Math.round(number / 100) / 10) + 'k';
	}
	return number;
}

export const fetchFromReddit = (type, path) => {
	console.log(`fetch ${type}: fetching...`);
	let startTime = performance.now();
	return fetch(path)
		.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					console.log(`fetch ${type}: failed to fetch`);
					// TODO: Promise.reject(rejected);
					// is this where we handle failed gets?
				}
		}).then(response => {
			switch (type) {
				case 'posts':
					if (response) {
						let posts = response.data.children;
						posts = posts.map(post => {
							return post.data;
						});
						return posts;
					}
					return [];
				case 'searchSuggestions':
					let subreddits = response.data.children.slice(0, 5);
					subreddits = subreddits.map(subreddit => {
						return subreddit.data.display_name
					});
					return subreddits;
				case 'comments':
					let comments = response[1].data.children;
					return comments;
				default:
					console.log('fetchFromReddit: case not handled');
			}
		}).then(response => {
			let endTime = performance.now()
			console.log(`fetch ${type}: fetched in ${Math.round((endTime - startTime) / 100) / 10} seconds.`);
			return response;
		}).catch(error => {
			console.log('fetchFromReddit: network error');
			console.log(error)
		})
}