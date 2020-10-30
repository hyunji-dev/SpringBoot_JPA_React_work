import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';

const Header = () => {
	const isLogin = useSelector((store) => store.isLogin);
	const dispatch = useDispatch();

	const logoutProc = () => {
		localStorage.removeItem("Authorization");
		dispatch(logout());
	}
	return (
		<div>
			<nav class="navbar navbar-inverse">
				<div class="container-fluid">
					<div class="navbar-header">
						<div class="navbar-brand">WebSiteName</div>
					</div>
					<ul class="nav navbar-nav">
						<li class="active"><Link to="/" className="navbar-brand">Notification</Link></li>
						<li>1</li>
						<li>2</li>
					</ul>
					
					<ul class="nav navbar-nav navbar-right">
						{isLogin ? 
							(
								<>
									<li>
										<Link to="/loginForm" onClick={logoutProc} ><span class="glyphicon glyphicon-log-out"></span> Loout</Link>
									</li>
								</>
							)
							:
							(
								<>
									<li>
										<Link to="/joinForm" ><span class="glyphicon glyphicon-user"></span> Sign Up</Link>
									</li>
									<li>
										<Link to="/loginForm" ><span class="glyphicon glyphicon-log-in"></span> Login</Link>
									</li>
								</>
							)
						}
						
					</ul>
		</div>
</nav>
		</div>
	);
};

export default Header;