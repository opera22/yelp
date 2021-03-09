import axios from "axios";

// NODE_ENV = "development"
// NODE_ENV = "production"

// if we are in production, use baseurl = /api/restaurants

const baseURL =
	process.env.NODE_ENV === "production"
		? "api/restaurants"
		: "http://localhost:4000/api/restaurants";

export default axios.create({
	baseURL,
});
