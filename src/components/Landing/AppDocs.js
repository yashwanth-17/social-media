import React from 'react';

let data = [];
for (let i = 0; i < 9; i++) {
	data.push(
		<div className='docContent'>
			<img src='Images/sai.jpg' alt='sample' />
			<div>
				<h5>Home Page</h5>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste quo
					facilis, beatae eligendi repellendus voluptatum minima, molestiae quis
					consectetur consequuntur ea repellat repudiandae dicta vitae et dolor?
					Excepturi praesentium labore, quibusdam a eos, laudantium repudiandae
					nam cum veniam esse inventore? Dolore, hic commodi? Sunt atque, rem
					iure consequatur nulla consequuntur excepturi mollitia aliquid iste.
				</p>
			</div>
		</div>
	);
}

function AppDocs() {
	return (
		<div id='docContainer'>
			<h1>Documentation</h1>
			{data}
		</div>
	);
}

export default AppDocs;
