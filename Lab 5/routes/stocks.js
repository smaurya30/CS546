const axios = require('axios');
const express = require('express');
const router = express.Router();

async function getStocks(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
    return data
  }

  router.get('/', async(req,res) => {
    try{
        let data = await getStocks();
        res.json(data);
    } catch(e){
        console.log(e);
        res.status(500).send();
    }
});

router.get('/:id', async(req, res) => {
    try{
        let idExp = /^[a-zA-Z0-9-]+$/;
        if(!req.params.id.match(idExp)){
            res.status(404).json({error: 'Invalid String'});
        }
        let flag = 0;
        let stocksData = await getStocks();
        for(const item of stocksData){
            if(item.id == req.params.id) {
                flag = 1;
                res.json(item);
            }
        }
        if(flag == 0) {
            res.status(404).json({error : 'Stock not found.'});
        }
    } catch(e){
        res.status(500).send();
    }
});

router.post('/', async (req, res) => {
    // Not implemented
    res.status(501).send();
});
  
router.delete('/', async (req, res) => {
    // Not implemented
    res.status(501).send();
});

module.exports = router;