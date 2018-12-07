const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const contactsRoutes = require('./routes/contacts');

mongoose.connect(
    'mongodb://arshbhatti8:'+
    process.env.MONGO_ATLAS_PW +
    '@cluster0-shard-00-00-ovbfq.mongodb.net:27017,cluster0-shard-00-01-ovbfq.mongodb.net:27017,' +
    'cluster0-shard-00-02-ovbfq.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');

if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
    return res.status(200).json({});
}
next();
});

app.use('/contacts',contactsRoutes);

module.exports=app;