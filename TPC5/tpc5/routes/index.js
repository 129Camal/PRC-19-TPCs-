const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', (req, res, next) => {
  

  axios.get('http://localhost:7200/rest/repositories', {headers: {Accept:"application/sparql-results+json"}})
        .then(response => {
            res.render('repositories', { repositories : response.data});
            })
         .catch(error => console.log("ERRO: " + error))
});

/* GET Repository */
router.get('/repository/:rep', (req, res, next) => {
  axios.get('http://localhost:7200/rest/repositories/' + req.params.rep + '/size', {headers: {Accept:"application/sparql-results+json"}})
          .then(response => {
            res.render('repository', {repName: req.params.rep, size: response.data});
            })
          .catch(error => console.log("ERRO: " + error))
});

router.post('/repository/:rep', (req, res, next) => {
  
  var encoded = encodeURIComponent(req.body.query);
  
  axios.get('http://localhost:7200/repositories/' + req.params.rep + '?query=' + encoded, {headers: {Accept:"application/sparql-results+json"}})
    .then(response => {
      axios.get('http://localhost:7200/rest/repositories/' + req.params.rep + '/size', {headers: {Accept:"application/sparql-results+json"}})
            .then( resp =>{
              res.render('repository', {repName: req.params.rep, queryresponse: response.data, size: resp.data, query: req.body.query});
            })
            .catch(error => console.log("ERRO Querying graphDB: " + error))
    })
    .catch(error => console.log("ERRO Querying graphDB: " + error))
});

module.exports = router;
