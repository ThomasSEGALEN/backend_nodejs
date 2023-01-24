const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const agentRoutes = require('./routes/agent');
const interventionRoutes = require('./routes/intervention');

const app = express();

mongoose
    .connect(
        'mongodb+srv://Thomas:Thomas@nodejs.9sgsnza.mongodb.net/?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    );
    next();
});

app.use('/api/agent', agentRoutes);
app.use('/api/intervention', interventionRoutes);

module.exports = app;
