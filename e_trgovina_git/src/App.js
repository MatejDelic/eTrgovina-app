import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import CardList from './components/Card/CardList';
import CartList from './components/Cart/CartList';
import PreCart from './components/Cart/PreCart';
import SearchBox from './components/SearchBox/SearchBox';
import { items } from './components/Card/items';
import './App.css';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

class App extends Component {
	constructor() {
		super();
		this.state = {
	    	route: 'signin',
	    	isSignedIn: false,
	    	items: items,
			searchfield: '',
			cartItems: [],
			user: {
		        id: '',
		        name: '',
		        email: '',
		        joined: ''
		      }
		}
	}

	loadUser = (data) => {
	    this.setState({user: {
	      id: data.id,
	      name: data.name,
	      email: data.email,
	      joined: data.joined
	    }})
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })
	}

	onRouteChange = (route) => {
		if (route === 'signout') {
	    	this.setState({isSignedIn: false})
		} else if (route === 'home') {
	    	this.setState({isSignedIn: true})
	   	}
		this.setState({route: route});
	}

	itemAdded = (data, route) => {
		const exist = this.state.cartItems.find((x) => x.id === data);

		if(exist) {
			let items = [ ...this.state.items ];
			items[data-1] = {...items[data-1], qty: items[data-1].qty+1};
			console.log(items[data-1]);
			this.setState({ items });
		} else {
			const cartItem = items.filter(item =>{
				return item.id === data
			})
			const joined = this.state.cartItems.concat(cartItem);
			this.setState({ cartItems: joined })
			console.log(this.state.cartItems);
		}
		this.onRouteChange(route);
	}

	minus = (data) => {
		const exist = this.state.items.find((x) => x.id === data);

		if(exist.qty > 1) {
			let items = [ ...this.state.items ];
			items[data-1] = {...items[data-1], qty: items[data-1].qty-1};
			console.log(items[data-1]);
			this.setState({ items });
		}
	}

	remove = (data) => {
		const joined = this.state.cartItems.filter(x => x.id !== data);
		this.setState({ cartItems: joined })
	}

	render() {
		const { route, isSignedIn, items, searchfield, cartItems } = this.state;
		const filteredItems = items.filter(item =>{
			return item.name.toLowerCase().includes(searchfield.toLowerCase())
		})
		return (
			<PayPalScriptProvider
				options={{ "client-id": "AdAWbyDcLhaiael_Yeoe3g43WSpTrvMZFoNwWMnD4b0dQxYe1bpy172yQCo24U7YstLuljXCZTMlK5mW" }}
			>
				<div className="App">
					<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
					{route === 'home'
						? <div style={{marginTop: "120px"}}>
							<SearchBox searchChange={this.onSearchChange}/>
								<CardList items={filteredItems} itemAdded={this.itemAdded} onRouteChange={this.onRouteChange}/>
						</div>
						: (
							route === 'cart'
							? <div style={{marginTop: "120px"}}>
								<CartList items={cartItems} items_2={items} itemAdded={this.itemAdded} minus={this.minus} remove={this.remove}/>
							</div>
							: (
								route === 'signin'
								? <div style={{marginTop: "120px"}}><Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/></div>
								: (
									route === 'preCart'
									? <div style={{marginTop: "120px"}}><PreCart onRouteChange={this.onRouteChange}/></div>
									: <div style={{marginTop: "120px"}}><Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/></div>
							)
							)
						)
					}
				</div>
			</PayPalScriptProvider>
		);
	}
}

export default App;
