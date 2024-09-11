import React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
	if (isSignedIn) {
		return (
			<nav className='navigation'>
				<p className='push f3 link black pa3 mv1 pointer b'>eTrgovina</p>
				<p onClick={() => onRouteChange('home')} className='f3 link dim black underline pa3 ma1 pointer grow'>Trgovina</p>
				<p onClick={() => onRouteChange('cart')} className='f3 link dim black underline pa3 ma1 pointer grow'>Košarica</p>
				<p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 ma1 pointer grow'>Odjava</p>
			</nav>
		);
	}
	else {
		return (
			<nav className='navigation'>
				<p className='push f3 link black pa3 mv1 pointer b'>eTrgovina</p>
				<p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 ma1 pointer grow'>Prijava</p>
				<p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 ma1 pointer grow'>Registracija</p>
			</nav>
		);
	}
}

export default Navigation;