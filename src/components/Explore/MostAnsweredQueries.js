import { React } from 'react';

/* importing components */
import Question from '../Qna/Question';
import data from '../data.json';

/* components from swiper library */
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/effect-coverflow/effect-coverflow.min.css';
import SwiperCore, { Pagination, Autoplay } from 'swiper/core';

/* Initializing the SwiperCore components */
SwiperCore.use([Pagination, Autoplay]);

function MostAnsweredQuery() {
	/* custom styles for pagination in swiper */
	const pagination = {
		clickable: true,
		renderBullet: function (index, className) {
			return '<span class="' + className + '">' + (index + 1) + '</span>';
		},
	};

	let posts = [];
	for (let i = 0; i < data.length; i++) {
		posts.push(
			<SwiperSlide id='mostAnsweredQuerySwiperSlide' key={i}>
				<div>
					<Question user={data[i]} key={data[i].id} />
				</div>
			</SwiperSlide>
		);
	}

	return (
		<>
			<h1 id='mostAnsweredQueryHeading'>Most Answered Queries</h1>
			<Swiper
				id='mostAnsweredQuerySwiper'
				pagination={pagination}
				centeredSlides={true}
				slidesPerView={'auto'}
				spaceBetween={30}
				grabCursor={true}
				loop={true}
				direction={'vertical'}
				autoplay={
					(true,
					{
						delay: 2500,
						disableOnInteraction: false,
					})
				}
			>
				{posts}
			</Swiper>
		</>
	);
}

export default MostAnsweredQuery;
