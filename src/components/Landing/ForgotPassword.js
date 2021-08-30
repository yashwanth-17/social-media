import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { HiOutlineMail } from 'react-icons/hi';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { auth } from '../Firebase';

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(1),
	},
}));

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function ForgotPassword() {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		console.log(email);
		await auth
			.sendPasswordResetEmail(email)
			.then((res) => setOpen(true))
			.catch((err) => console.log('Password Reset Unsuccessfull', err.message));
	};

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	return (
		<>
			<div style={{ textAlign: 'center' }}>
				<img src='Images/forgot.png' width='60%' alt='login' />
			</div>
			<form className={classes.margin} onSubmit={handleSubmit}>
				<div className={classes.margin}>
					<Grid container spacing={1} alignItems='flex-end' justify='center'>
						<Grid item>
							<HiOutlineMail size={25} />
						</Grid>
						<Grid item>
							<TextField
								id='email'
								name='email'
								label='Email / Username'
								autoComplete='off'
								required
							/>
						</Grid>
					</Grid>
				</div>
				<div style={{ textAlign: 'center' }}>
					<Button
						type='submit'
						className='mt-3 mb-2'
						variant='contained'
						color='primary'
					>
						Send
					</Button>
					<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
						<Alert onClose={handleClose} severity='success'>
							Email Sent Successfully!
						</Alert>
					</Snackbar>
				</div>
			</form>
		</>
	);
}

export default ForgotPassword;
