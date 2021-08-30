import React from 'react';

/* components from react-bootstrap library */
import { Card, Button } from 'react-bootstrap';

/* components from swiper library */
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/effect-coverflow/effect-coverflow.min.css';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper/core';

/* Initializing the SwiperCore components */
SwiperCore.use([Navigation, Pagination, Autoplay]);

function MostCommentedPosts() {
	/* custom styles for pagination in swiper */
	const pagination = {
		clickable: true,
		renderBullet: function (index, className) {
			return '<span class="' + className + '">' + (index + 1) + '</span>';
		},
	};

	let posts = [];
	for (let i = 0; i < 10; i++) {
		posts.push(
			<SwiperSlide id='mostCommentedPostsSwiperSlide' key={i}>
				<Card style={{ width: '18rem' }}>
					<Card.Img
						variant='top'
						src='https://source.unsplash.com/random'
						style={{
							width: '17rem',
							height: '15rem',
							margin: '10px auto',
						}}
					/>
					<Card.Body>
						<Card.Title>Card Title - {i + 1}</Card.Title>
						<Card.Text>
							Some quick example text to build on the card title and make up the
							bulk of the card's content.
						</Card.Text>
						<Button variant='primary'>Go somewhere</Button>
					</Card.Body>
				</Card>
			</SwiperSlide>
		);
	}

	return (
		<>
			<h1 id='mostCommentedPostsHeading'>Most Commented Posts</h1>
			<Swiper
				id='mostCommentedPostsSwiper'
				navigation={true}
				pagination={pagination}
				centeredSlides={true}
				slidesPerView={'auto'}
				spaceBetween={30}
				grabCursor={true}
				loop={true}
				autoplay={{
					delay: 1500,
					disableOnInteraction: false,
				}}
			>
				{posts}
			</Swiper>
		</>
	);
}

export default MostCommentedPosts;
