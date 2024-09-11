import React from 'react';
import './Cart.css';

const Cart = ({ id, image, name, price, items_2, itemAdded, minus, remove }) => {
	const item = items_2.find((x) => x.id === id);
	return (
			<div className='tc br3 pa3 ma2 bw2 shadow-5 row' style={{backgroundColor: "#9CB4C7"}}>
				<div>
					<img alt='neka slika' src={`./photos/${image}.jpg`} width="150" height="100"/>
					<h2>{name}</h2>
				</div>
				<div>
					<h2>{`${price}€`}</h2>
				</div>
				<div>
					<button onClick={() => minus(id)}>-</button>
					<p>{`x ${item.qty}`}</p>
					<button onClick={() => itemAdded(id,'cart')}>+</button>
				</div>
				<div>
					<button 
						onClick={() => remove(id)} 
						className="br3 pa3 ma2 b ph3 pv2 input-reset ba b--black bg-white grow pointer f4 dib">
					Ukloni</button>
				</div>
				<div>
					<h2>ukupno: {price*item.qty}€</h2>
				</div>
			</div>
	);
}

export default Cart;