const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// these two are always needed when retrieving POST data from client-side
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// allows front-end resources like images, client-side JS, or CSS available when called in index.html
app.use(express.static('public'));

/* This is our way of telling the server that any time a client navigates
to <ourhost>/api, the app will use the router we set up in apiRoutes.
If / is the endpoint, then the router will serve back our HTML routes.
*/
app.use('/api', apiRoutes);
app.use('/', htmlRoutes)

const { animals } = require('./data/animals.json');

const fs = require('fs');
const path = require('path');


/* The require() statements will read the index.js files
in each of the directories indicated. This mechanism works the
same way as directory navigation does in a website: If we navigate to a
directory that doesn't have an index.html file, then the contents are displayed
in a directory listing. But if there's an index.html file, then it is read and its
HTML is displayed instead. Similarly, with require(), the index.js file will be the default
file read if no other file is provided, which is the coding method we're using here. */

// -------------







app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/animals', (req, res) => {
  res.sendFile(path.join(__dirname, './public/animals.html'));
});

app.get('/zookeepers', (req, res) => {
  res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});
