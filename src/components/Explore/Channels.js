import React, { useState, useEffect } from 'react';

/* Material UI Imports */
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

/* Firebase Import */
import { db } from '../Firebase';

function Channels() {
	const [chipData, setChipData] = useState([]);
	const [userSelectedChannels, setUserSelectedChannels] = useState([]);
	const userId = 'Q2Sl5NqZEa8SdG1G1wFA';

	/* Custom Styles for Channels - @materialUI */
	const useStyles = makeStyles((theme) => ({
		root: {
			listStyle: 'none',
			padding: theme.spacing(0.5),
			margin: '10px',
		},
		chip: {
			margin: theme.spacing(0.5),
		},
	}));
	const classes = useStyles();

	/* useEffect to load the channels available for everyone */
	useEffect(() => {
		const unsubscribe = db.collection('channels').onSnapshot((snapshot) => {
			const newChannels = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setChipData(newChannels);
		});
		return unsubscribe;
	}, []);

	/* useEffect to load the channels selected by the user */
	useEffect(() => {
		const unsubscribe = db
			.collection('users')
			.doc(userId)
			.onSnapshot((snapshot) => {
				setUserSelectedChannels(snapshot.data().selectedChannels);
			});
		return unsubscribe;
	}, []);

	const handleUpdate = (chipToUpdate, selected) => {
		let newSelectedChannels = [...userSelectedChannels];

		/* Loop to filter user selected channels which are not available in channels  */
		newSelectedChannels = newSelectedChannels.filter((channel) => {
			let found = false;
			for (let i = 0; i < chipData.length; i++) {
				if (chipData[i].id === channel) {
					found = true;
					break;
				}
			}
			return found;
		});
		if (!selected) {
			newSelectedChannels.push(chipToUpdate);
		} else {
			const index = newSelectedChannels.indexOf(chipToUpdate);
			newSelectedChannels.splice(index, 1);
		}

		/* updating the user selected channels */
		db.collection('users')
			.doc(userId)
			.update({ selectedChannels: newSelectedChannels });
	};

	return (
		<div id='channelsPart'>
			<h1 id='channelsHeading'>Channels Available</h1>
			<div id='channelsImagePart'>
				<img
					id='channelsImage'
					src='Images/Choose.png'
					alt='Channels Available'
				/>
			</div>
			<Paper component='ul' id='channelsContentPart' className={classes.root}>
				{chipData.map((data) => {
					let selected = userSelectedChannels.includes(data.id);
					let icon = selected ? (
						<CheckCircleIcon style={{ color: 'white' }} />
					) : (
						<CheckCircleOutlineIcon />
					);
					return (
						<li key={data.id}>
							<Chip
								label={data.label}
								onDelete={() => handleUpdate(data.id, selected)}
								className={classes.chip}
								deleteIcon={icon}
								color={selected ? 'primary' : 'default'}
								id='channelsChip'
							/>
						</li>
					);
				})}
			</Paper>
		</div>
	);
}

export default Channels;
