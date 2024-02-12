const express = require('express');
const mongoose = require('mongoose');
const User = require('./Users');

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect('mongodb+srv://admin:admin@cluster0.kvivlmt.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send(newUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});