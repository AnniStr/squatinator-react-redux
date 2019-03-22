const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const users = require('./routes/user'); 

const app = express();
mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);

//Middleware
app.use(bodyParser.json());

// DB config
const { db } = require('./db.js'); // Connect DB
const exerciseController = require('./controllers/exerciseController.js'); // um router aus controller zu nutzen
const workoutController = require('./controllers/workoutController.js');
const passport = require('./passport');
// Use Routes
app.use('/exercises', exerciseController);
app.use('/workouts', workoutController);
app.use('/passport', passport);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/users', users);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started at port : ${port}`));