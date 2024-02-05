const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://admin:admin@cluster0.kvivlmt.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

// Restaurant Schema
const restaurantSchema = new mongoose.Schema({
    address: {
        building: String,
        street: String,
        zipcode: String,
    },
    city: String,
    cuisine: String,
    name: String,
    restaurant_id: String,
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// Seeding Data from txt file
const seedData = [
    {
        "address": {
            "building": "1008",
            "street": "Morris Park Ave",
            "zipcode": "10462"
        },
        "city": "Bronx",
        "cuisine": "Bakery",
        "name": "Morris Park Bake Shop",
        "restaurant_id": "30075445"
    },
    {
        "address": {
            "street": "Thai Son Street",
            "zipcode": null
        },
        "city": "Manhattan",
        "cuisine": "Vietnamese",
        "name": "Pho Me Long Time",
        "restaurant_id": "30075455"
    },
    {
        "address": {
            "building": "253",
            "street": "East 167 Street",
            "zipcode": null
        },
        "city": "Bronx",
        "cuisine": "Chicken",
        "name": "Mom's Fried Chicken",
        "restaurant_id": "40382900"
    },
    {
        "address": {
            "building": "120",
            "street": "East 56 Street",
            "zipcode": "19800"
        },
        "city": "Manhattan",
        "cuisine": "Italian",
        "name": "Montebello Restaurant",
        "restaurant_id": "40397082"
    },
    {
        "address": {
            "building": "195",
            "street": "Soprano Street",
            "zipcode": "17500"
        },
        "city": "Staten Island",
        "cuisine": "Hamburgers",
        "name": "Joeys Burgers",
        "restaurant_id": "40397555"
    },
    {
        "address": {
            "building": "200",
            "street": "Queens Boulevard",
            "zipcode": "19700"
        },
        "city": "Queens",
        "cuisine": "American",
        "name": "Brunos on the Boulevard",
        "restaurant_id": "40397678"
    },
    {
        "address": {
            "building": "555",
            "street": "Sushi Street",
            "zipcode": "17700"
        },
        "city": "Brooklyn",
        "cuisine": "Japanese",
        "name": "Iron Chef House",
        "restaurant_id": "40397699"
    },
    {
        "address": {
            "building": "555",
            "street": "Fontana Street",
            "zipcode": null
        },
        "city": "Brooklyn",
        "cuisine": "Japanese",
        "name": "Wasabi Sushi",
        "restaurant_id": "40398000"
    },
    {
        "address": {
            "building": "900",
            "street": "Goodfellas Street",
            "zipcode": "17788"
        },
        "city": "Brooklyn",
        "cuisine": "Delicatessen",
        "name": "Sal's Deli",
        "restaurant_id": "40898000"
    },
    {
        "address": {
            "building": "909",
            "street": "44 Gangster Way",
            "zipcode": "17988"
        },
        "city": "Queens",
        "cuisine": "Delicatessen",
        "name": "Big Tony's Sandwich Buffet",
        "restaurant_id": "40898554"
    },
    {
        "address": {
            "building": "1201",
            "street": "121 Canolli Way",
            "zipcode": "17989"
        },
        "city": "Queens",
        "cuisine": "Delicatessen",
        "name": "The Godfather Panini Express",
        "restaurant_id": "40898554"
    },
];

// Seeding Function
const seedDatabase = async () => {
    try {
        await Restaurant.insertMany(seedData);
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error: ', error);
    }
};

seedDatabase();

// Get all Restaurants
app.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Get all restaurant by cuisine
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
    const { cuisine } = req.params;
    try {
        const restaurants = await Restaurant.find({ cuisine: cuisine });
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Get by restaurant id with sorting    
app.get('/restaurants', async (req, res) => {
    const { sortBy } = req.query;
    const sortOption = sortBy === 'DESC' ? -1 : 1;
    try {
        const restaurants = await Restaurant.find({}, { _id: 0, cuisine: 1, name: 1, city: 1, restaurant_id: 1 }).sort({ restaurant_id: sortOption });
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Get with filter and sorting
app.get('/restaurants/:cuisine', async (req, res) => {
    const { cuisine } = req.params;
    try {
        const restaurants = await Restaurant.find({ cuisine: cuisine, city: { $ne: 'Brooklyn' } }, { _id: 0, cuisine: 1, name: 1, city: 1 }).sort({ name: 1 });
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});