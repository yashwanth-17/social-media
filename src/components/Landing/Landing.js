import { React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Login from './Login';
import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import Highlights from './Highlights';
import AppSummary from './AppSummary';
import AppDocs from './AppDocs';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	},
}));

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(0),
		boxShadow: '1px 1px 2px -2px black',
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(0),
		color: theme.palette.grey[500],
	},
});

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography
				variant='h4'
				style={{
					padding: '5px',
					textAlign: 'center',
					backgroundColor: '#353941',
					color: 'white',
				}}
			>
				{children}
			</Typography>
			{onClose ? (
				<IconButton
					aria-label='close'
					className={classes.closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(0),
	},
}))(MuiDialogContent);

function Landing() {
	const classes = useStyles();
	const [loginOpen, setLoginOpen] = useState(false);
	const [signUpOpen, setSignUpOpen] = useState(false);
	const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

	const handleLoginClickOpen = () => {
		setLoginOpen(true);
	};
	const handleLoginClose = () => {
		setLoginOpen(false);
	};

	const handleSignUpClickOpen = () => {
		setSignUpOpen(true);
	};
	const handleSignUpClose = () => {
		setSignUpOpen(false);
	};

	const handleForgotPasswordClickOpen = () => {
		setLoginOpen(false);
		setForgotPasswordOpen(true);
	};
	const handleForgotPasswordClose = () => {
		setForgotPasswordOpen(false);
	};

	return (
		<div className={classes.root}>
			<AppBar
				position='static'
				style={{ backgroundColor: '#343a40', color: 'white' }}
			>
				<Toolbar>
					<Typography variant='h6' className={classes.title}>
						College Media
					</Typography>
					<Button color='inherit' onClick={handleLoginClickOpen}>
						Login
					</Button>
					<Button color='inherit' onClick={handleSignUpClickOpen}>
						Sign Up
					</Button>
				</Toolbar>
			</AppBar>
			<Highlights />
			<AppSummary />
			<AppDocs />
			<Dialog
				onClose={handleLoginClose}
				aria-labelledby='customized-dialog-title'
				open={loginOpen}
				maxWidth='xs'
				disableBackdropClick
				disableEscapeKeyDown
			>
				<DialogTitle
					id='customized-dialog-title'
					onClose={handleLoginClose}
					justify='center'
				>
					Sign In
				</DialogTitle>
				<DialogContent>
					<Login
						handleForgotPasswordClickOpen={handleForgotPasswordClickOpen}
					/>
				</DialogContent>
			</Dialog>

			<Dialog
				onClose={handleSignUpClose}
				aria-labelledby='customized-dialog-title'
				open={signUpOpen}
				maxWidth='xs'
				disableBackdropClick
				disableEscapeKeyDown
			>
				<DialogTitle
					id='customized-dialog-title'
					onClose={handleSignUpClose}
					justify='center'
				>
					Sign Up
				</DialogTitle>
				<DialogContent>
					<Signup />
				</DialogContent>
			</Dialog>

			<Dialog
				onClose={handleForgotPasswordClose}
				aria-labelledby='customized-dialog-title'
				open={forgotPasswordOpen}
				maxWidth='xs'
				disableBackdropClick
				disableEscapeKeyDown
			>
				<DialogTitle
					id='customized-dialog-title'
					onClose={handleForgotPasswordClose}
					justify='center'
				>
					Forgot Password ?
				</DialogTitle>
				<DialogContent>
					<ForgotPassword />
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default Landing;
