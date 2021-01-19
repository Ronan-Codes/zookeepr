const router = require('express').Router();

const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

// --------------------

// http://localhost:3001/api/animals
router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results);
  });

// can be accessed by /api/animals/1 - for exmaple.
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
      res.json(result);
    } else {
      res.send(404);
    }
  });

router.post('/animals', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
      res.status(400).send('The animal is not properly formatted.');
    } else {
      // add animal to json file and animals array in this function
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
    }
  });


module.exports = router;

// /api is taken out of routes, because Route function appends it already

/* Next, as we discussed in the previous section,
we cannot use app any longer, because it's defined in the
server.js file and cannot be accessed here. Instead, we'll use Router,
which allows you to declareroutes in any file as long as you use the proper middleware.
*/
