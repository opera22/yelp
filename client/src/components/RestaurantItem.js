import React from "react";
import "./RestaurantItem.css";

const RestaurantItem = ({ id, name, location, price_range }) => {
	return (
		<div className="restaurant-item">
			<div className="rest-id">Id: {id}</div>
			<div className="rest-name">{name}</div>
			<div className="rest-loc">{location}</div>
			<div className="rest-price-range">Price: {price_range}</div>
		</div>
	);
};

export default RestaurantItem;
