import { React } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import Link from '@material-ui/core/Link';
import { auth } from '../Firebase';

const useStyles = makeStyles((theme) => ({
	margin: {
		margin: theme.spacing(1),
	},
}));

function Login({ handleForgotPasswordClickOpen }) {
	const classes = useStyles();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;
		console.log(email, password);
		await auth
			.signInWithEmailAndPassword(email, password)
			.then((res) => console.log('Login Successfull', res))
			.catch((err) => console.log('Login Unsuccessfull', err.message));
	};

	return (
		<>
			<div style={{ textAlign: 'center' }}>
				<img src='Images/login2.jpg' width='90%' alt='login' />
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
								label='Username'
								autoComplete='off'
								required
							/>
						</Grid>
					</Grid>
				</div>
				<div className={classes.margin}>
					<Grid container spacing={1} alignItems='flex-end' justify='center'>
						<Grid item>
							<RiLockPasswordLine size={25} />
						</Grid>
						<Grid item>
							<TextField
								id='password'
								name='password'
								label='Password'
								type='password'
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
						Login
					</Button>
					<br />
					<Link
						component='button'
						variant='body2'
						onClick={handleForgotPasswordClickOpen}
					>
						Forgot Password ?
					</Link>
				</div>
			</form>
		</>
	);
}

export default Login;
