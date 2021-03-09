import React from "react";
import RestaurantItem from "./RestaurantItem";
import "./RestaurantList.css";

const RestaurantList = ({ restaurants }) => {
	if (restaurants.length === 0) {
		return <div></div>;
	}

	const renderedList = restaurants.map((restaurant) => {
		return (
			<div key={restaurant.id} style={{}}>
				<RestaurantItem
					id={restaurant.id}
					name={restaurant.name}
					location={restaurant.location}
					price_range={restaurant.price_range}
				/>
			</div>
		);
	});

	return <div className="restaurant-list">{renderedList}</div>;
};

export default RestaurantList;
