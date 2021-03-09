require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const db = require("./db");
const cors = require("cors");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// get all restaurants
app.get("/api/restaurants", async (req, res) => {
	try {
		const results = await db.query("SELECT * FROM restaurants;");
		res.status(200).json({
			status: "success",
			results: results.rows.length,
			data: {
				restaurants: results.rows,
			},
		});
	} catch (err) {
		console.log(err);
	}
});

// get individual restaurant
app.get("/api/restaurants/:id", async (req, res) => {
	try {
		const results = await db.query(
			"SELECT * FROM restaurants WHERE id = $1 LIMIT 1",
			[req.params.id]
		);
		res.status(200).json({
			status: "success",
			data: {
				restaurants: results.rows,
			},
		});
	} catch (err) {
		console.log(err);
	}
});

// create a restaurant
app.post("/api/restaurants", async (req, res) => {
	console.log(req.body);

	try {
		const results = await db.query(
			"INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
			[req.body.name, req.body.location, req.body.price_range]
		);
		res.status(201).json({
			status: "success",
			data: {
				restaurants: results.rows,
			},
		});
	} catch (err) {}
});

// update restaurants
app.put("/api/restaurants/:id", async (req, res) => {
	try {
		const results = await db.query(
			"UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
			[req.body.name, req.body.location, req.body.price_range, req.params.id]
		);
		console.log(req.params.id);
		console.log(req.body);
		res.status(200).json({
			status: "success",
			data: {
				restaurants: results.rows[0],
			},
		});
	} catch (err) {
		console.log(err);
	}
});

// delete restaurant
app.delete("/api/restaurants/:id", async (req, res) => {
	try {
		const results = db.query(
			"DELETE FROM restaurants WHERE id = $1 RETURNING *",
			[req.params.id]
		);

		res.status(204).json({
			status: "success",
		});
	} catch (err) {
		console.log(err);
	}
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log(`Listening on ${port}...`);
});
