//import necessary modules
const express = require('express');
const db = require("./config/connection");
const routes = require('./routes');

//create express server
const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use(routes);

//connect to database
db.once('open', () => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});

