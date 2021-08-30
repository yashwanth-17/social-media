import React from 'react';
import { Link } from 'react-router-dom';

/* components from react-bootstrap */
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';

/* Icons from FontAwesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

/* Firebase Imports */
import { auth } from '../Firebase';

function NavBar() {
	const logOut = async () => {
		await auth.signOut();
	};

	return (
		<Navbar bg='dark' variant='dark' expand='lg'>
			<Navbar.Brand as={Link} to='/'>
				College Media
			</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='ml-auto'>
					<Nav.Link as={Link} className='navItem' to='/explore'>
						Explore
					</Nav.Link>
					<Nav.Link as={Link} className='navItem' to='/qna'>
						QnA
					</Nav.Link>
					<Nav.Link as={Link} className='navItem' to='/about'>
						About Us
					</Nav.Link>
					<NavDropdown
						title={
							<span className='navItem'>
								<FontAwesomeIcon
									icon={faUserCircle}
									size='lg'
									className='mr-2'
								/>
								Naveen Anagandula
							</span>
						}
						variant='dark'
						id='basic-nav-dropdown'
					>
						<NavDropdown.Item
							as={Link}
							to='/Profile'
							style={{ textAlign: 'center' }}
						>
							Profile
						</NavDropdown.Item>
						<NavDropdown.Item
							as={Link}
							to='/Settings'
							style={{ textAlign: 'center' }}
						>
							Settings
						</NavDropdown.Item>
						<NavDropdown.Item
							as={Button}
							style={{ textAlign: 'center' }}
							onClick={logOut}
						>
							Logout
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default NavBar;
