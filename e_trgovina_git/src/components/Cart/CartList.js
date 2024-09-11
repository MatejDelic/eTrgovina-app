import React from 'react';
import Cart from './Cart';
import './Modal.css';
import PaypalCheckoutButton from "./PaypalCheckoutButton";

const CartList = ({ items, items_2, itemAdded, minus, remove }) => {
	let sum = 0;

	for (let i = 0; i < items.length; i++) {
		let temp = items_2.find((x) => x.id === items[i].id);
		sum += items[i].price*temp.qty;
	}

	const product = {
		description: "Ukupno",
		price: sum
	};

	return (
		<div>
			{
				items.length === 0
				? <div>
					<h1 className='tc'>Vaša košarica je prazna!</h1>
					<h2 className='tc'>Molimo Vas da se vratite na trgovinu i dodate barem jedan artikal.</h2>
				</div>
				: <div>
					<h1 className='tc'>Vaši artikli:</h1>
					<div className='column'>	{items.map((user, i) => {
								return (
									<Cart 
										key={items[i].id}		//key treba da react brze zna koje izbrisat,a koje ostavit 
										id={items[i].id}
										image={items[i].image} 
										name={items[i].name} 
										price={items[i].price}
										items_2={items_2}
										itemAdded={itemAdded}
										minus={minus}
										remove={remove} 
									/>
								);
							})}
					</div>
					<div className='pa3 ma2'>
						<h1>Ukupna cijena: {sum}€</h1>
						<div className="paypal-button-container" style={{display: 'flex', justifyContent: 'center'}}>
        					<PaypalCheckoutButton product={product}/>
      					</div>
					</div>
				</div>
			}
		</div>
	);
}

export default CartList;