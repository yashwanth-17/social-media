import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';

function Highlights() {
	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};

	const arr = ['naruto.jpg', 'kakashi.jpg', 'goku2.png', 'strange.jpg'];

	return (
		<Carousel activeIndex={index} onSelect={handleSelect} id='temp'>
			{arr.map((item, index) => {
				return (
					<Carousel.Item key={index}>
						<img
							className='d-block w-100'
							src={`Images/${item}`}
							height='661px'
							alt={`Slide-${index}`}
						/>
						{/* <Carousel.Caption style={{ color: 'white' }}>
							<h3>Slide - {index + 1} label</h3>
							<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
						</Carousel.Caption> */}
					</Carousel.Item>
				);
			})}
		</Carousel>
	);
}

export default Highlights;
