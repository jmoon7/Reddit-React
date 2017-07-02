
# Reddit React

[See it in action](http://reddit-react.s3-website-us-west-2.amazonaws.com/).

> This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


### Component Tree


    App
        Main
            Header
            Title
            Subreddits
                SearchBox
            PostView
                Content
                Comments
            PostGrid
                Block
                    BlockImage

### Todos

Features:

    - Display full comments tree
    - More posts (infinite scrolling / next button)
    - Support Youtube videos
    - Login/Signup?
    - Show Loading...

Bugs:

    - subreddit suggestions broken on mobile
    - Scaling iframe in the Content container
    - Gilded sign at the end of the comment section
    - Search suggestions buggy if query change is faster than fetch time
    - setState warnings
    - fix error handling
