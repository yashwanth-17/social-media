import React, { useState, useEffect } from 'react';

/* importing required components */
import Question from './Question';
import Search from './Search';
import NoResults from './NoResults';

/* Importing Components from react-spinners */
import RingLoader from 'react-spinners/RingLoader';

/* Firebase Import */
import { db } from '../Firebase';

function Qna() {
	const [data, setData] = useState([]);
	const [queryData, setQueryData] = useState([]);
	const [category, setCategory] = useState('all');

	/* function to filter the queries w.r.t to searchValue of user */
	const handleSearch = (event) => {
		let searchVal = event.target.value.toLowerCase();
		let newQueryData;
		if (searchVal === '') {
			newQueryData = data.filter((query) => {
				if (
					category === 'all' ||
					query.tag.toLowerCase().search(category) !== -1
				)
					return true;
				return false;
			});
		} else {
			newQueryData = data.filter((query) => {
				if (category === 'all' || query.tag === category) {
					if (query.branch.toLowerCase().search(searchVal) !== -1) return true;
					if (query.name.toLowerCase().search(searchVal) !== -1) return true;
					if (query.query.toLowerCase().search(searchVal) !== -1) return true;
				}
				return false;
			});
		}
		setQueryData(newQueryData);
	};

	/* function to filter the queries w.r.t to the tag selected by user */
	const handleFilter = (event) => {
		setCategory(event.target.value.toLowerCase());
	};

	/* useEffect to change the queryData according to the tag selected by user */
	useEffect(() => {
		let newQueryData;
		if (category === 'all') newQueryData = data;
		else {
			newQueryData = data.filter(
				(query) => query.tag.toLowerCase().search(category) !== -1
			);
		}
		setQueryData(newQueryData);
	}, [category, data]);

	/* useEffect to load the queries from database */
	useEffect(() => {
		const unsubscribe = db.collection('qnas').onSnapshot((snapshot) => {
			setData([]);
			snapshot.docs.forEach((doc) => {
				let obj = {
					id: doc.id,
					name: 'anonymous',
					branch: 'anonymous',
					imageUrl: '',
					...doc.data(),
				};
				if (obj.anonymous === false && obj.postedBy !== '') {
					db.collection('users')
						.doc(obj.postedBy)
						.get()
						.then((res) => {
							obj.name = res.data().name;
							obj.branch = res.data().branch;
							obj.imageUrl = res.data().imageUrl;
							setData((prev) => [...prev, obj]);
						});
				} else setData((prev) => [...prev, obj]);
			});
		});
		return unsubscribe;
	}, []);

	return (
		<>
			<h3 className='m-2' id='qsHeading'>
				Questions
			</h3>
			<div id='qsContainer'>
				<div id='questionContainer'>
					{queryData.length === 0 ? (
						data.length === 0 ? (
							<div id='loading'>
								<RingLoader color='#D0021B' loading='true' size={60} />
							</div>
						) : (
							<NoResults />
						)
					) : (
						queryData.map((user) => {
							return <Question user={user} key={user.id} />;
						})
					)}
				</div>
				<div id='searchContainer'>
					<Search handleSearch={handleSearch} handleFilter={handleFilter} />
				</div>
			</div>
		</>
	);
}

export default Qna;
