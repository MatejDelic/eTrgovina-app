import React from 'react';
import Card from './Card';

const CardList = ({ items, itemAdded, onRouteChange }) => {

	return (
		<div className="ma5">
			{
				items.map((user, i) => {
					return (
						<Card 
							key={items[i].id}		//key treba da react brze zna koje izbrisat,a koje ostavit 
							id={items[i].id}
							image={items[i].image} 
							name={items[i].name} 
							price={items[i].price}
							itemAdded={itemAdded}
							onRouteChange={onRouteChange}
						/>
					);
				})
			}
		</div>
	);
}

export default CardList;