const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const contactsRoutes = require('./routes/contacts');

mongoose.connect('mongodb+srv://arsh:aeronautical@cluster0-skdsn.mongodb.net/test');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');

    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message
            }
        });

    });

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/contacts', contactsRoutes);

module.exports = app;