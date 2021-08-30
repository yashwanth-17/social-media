import React from 'react';
import Channels from './Channels';
import MostLikedPosts from './MostLikedPosts';
import MostAnsweredQuery from './MostAnsweredQueries';
import MostCommentedPosts from './MostCommentedPosts';

function Explore() {
	return (
		<>
			<Channels />
			<MostLikedPosts />
			<MostCommentedPosts />
			<MostAnsweredQuery />
		</>
	);
}

export default Explore;
