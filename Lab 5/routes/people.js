const axios = require('axios');
const express = require('express');
const router = express.Router();

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data
  }

router.get('/', async(req,res) => {
    try{
        let data = await getPeople();
        res.json(data);
    } catch(e){
        res.status(500).send();
    }
})

router.get('/:id', async(req,res) => {
    try{
        // Reference: https://stackoverflow.com/questions/5887678/alphanumeric-dash-and-underscore-but-no-spaces-regular-expression-check-javascr
        let idExp = /^[a-zA-Z0-9-]+$/;
        if(!req.params.id.match(idExp)){
            res.status(404).json({error: 'Invalid String'});
        }
        let data = await getPeople();
        let idObj = filterById(data, req.params.id);
        if (idObj){
            res.json(idObj);
        } else {
            res.status(404).json({error : 'User Id Not Found'});
        }
    } catch(e){
        res.status(500).send();
    }
})

// Reference :https://stackoverflow.com/questions/8163859/how-can-i-get-data-in-json-array-by-id/14723688
function filterById(jsonObject, id) {
    return jsonObject.filter(function(jsonObject) {
        return (jsonObject['id'] == id);
    })[0];
}

router.post('/', async (req, res) => {
    // Not implemented
    res.status(501).send();
});
  
router.delete('/', async (req, res) => {
    // Not implemented
    res.status(501).send();
});

module.exports = router;