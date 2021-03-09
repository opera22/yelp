import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import RestaurantDetailPage from "./routes/RestaurantDetailPage";
// import Home from "./routes/Home";
// import UpdatePage from "./routes/UpdatePage";
import axios from "axios";
import RestaurantList from "./RestaurantList";
import "./App.css";
import client from "../apis/RestaurantsFinder";

// get all restaurants
// button that modifies the list of entries
//  app.get("/api/v1/restaurants"

// get info for one restaurant
// button (after a form) that updates the list of entries to be just one restaurant
// app.get("/api/v1/restaurants/:id"

// add a restaurant
// button (after a form that asks for restaurant details
// app.post("/api/v1/restaurants"

// update a restaurant
// same as add a restaurant
// app.put("/api/v1/restaurants/:id"

// delete a restaurant
// same type of form as getting info for one restaurant, but it deletes instead
// app.delete("/api/v1/restaurants/:id"

const App = () => {
	const [restaurants, setRestaurants] = useState([]);
	const [getOneValue, setGetOneValue] = useState("");
	const [delOneValue, setDelOneValue] = useState("");
	const [addRestaurantNameValue, setAddRestaurantNameValue] = useState("");
	const [addRestaurantLocationValue, setAddRestaurantLocationValue] = useState(
		""
	);
	const [
		addRestaurantPriceRangeValue,
		setAddRestaurantPriceRangeValue,
	] = useState("");

	useEffect(() => {
		getAllRestaurants();
	}, []);

	const getAllRestaurants = async (e) => {
		const response = await client.get();
		setRestaurants(response.data.data.restaurants);
	};

	const getOneRestaurant = async (e) => {
		e.preventDefault();
		console.log(getOneValue);
		const response = await client.get(getOneValue);
		setRestaurants(response.data.data.restaurants);
	};

	const delOneRestaurant = async (e) => {
		e.preventDefault();
		const response = await client.delete(delOneValue);
		getAllRestaurants();
	};

	const addRestaurant = async (e) => {
		const response = await client.post("", {
			name: addRestaurantNameValue,
			location: addRestaurantLocationValue,
			price_range: addRestaurantPriceRangeValue,
		});
		getAllRestaurants();
	};

	return (
		<div className="app">
			{/* PUT ALL THE CONTROLS ABOVE THIS */}
			{/* Get all button stays right above the list */}

			<form
				onSubmit={(e) => {
					addRestaurant(e);
				}}
			>
				<input
					className="long-input block"
					type="text"
					placeholder="Name"
					value={addRestaurantNameValue}
					onChange={(e) => {
						setAddRestaurantNameValue(e.target.value);
					}}
				/>
				<input
					className="long-input block"
					type="text"
					placeholder="Location"
					value={addRestaurantLocationValue}
					onChange={(e) => {
						setAddRestaurantLocationValue(e.target.value);
					}}
				/>
				<input
					className="long-input block"
					type="text"
					placeholder="Price Range"
					value={addRestaurantPriceRangeValue}
					onChange={(e) => {
						setAddRestaurantPriceRangeValue(e.target.value);
					}}
				/>
				<button type="submit" className="block">
					Add Restaurant
				</button>
			</form>
			<hr></hr>
			<button
				className="get-all above-list"
				onClick={(e) => {
					getAllRestaurants();
				}}
			>
				Get All
			</button>
			<form
				className="get-one above-list"
				onSubmit={(e) => {
					getOneRestaurant(e);
				}}
			>
				<input
					className="small-input"
					type="text"
					placeholder="Id"
					value={getOneValue}
					onChange={(e) => {
						setGetOneValue(e.target.value);
					}}
				/>
				<button type="submit">Get One</button>
			</form>
			<form
				className="del-one above-list"
				onSubmit={(e) => {
					delOneRestaurant(e);
				}}
			>
				<input
					className="small-input"
					type="text"
					placeholder="Id"
					value={delOneValue}
					onChange={(e) => {
						setDelOneValue(e.target.value);
					}}
				/>
				<button type="submit">Delete One</button>
			</form>
			<RestaurantList restaurants={restaurants} />
		</div>
	);
};
// const App = () => {
// 	return (
// 		<div>
// 			<Router>
// 				<Switch>
// 					<Route exact path="/" component={Home} />
// 					<Route exact path="/restaurants/:id/update" component={UpdatePage} />
// 					<Route
// 						exact
// 						path="/restaurants/:id"
// 						component={RestaurantDetailPage}
// 					/>
// 				</Switch>
// 			</Router>
// 		</div>
// 	);
// };

export default App;
