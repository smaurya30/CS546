const axios = require('axios');

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data // this will be the array of people objects
  }

async function getStocks(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
    return data // this will be the array of stocks objects
  }

async function listShareholders() {
    if(arguments.length != 0) {
        throw `Number of arguments is invalid.`
    }
    let peopleData = await getPeople();
    let stocksData = await getStocks();

    for(const item of stocksData){
        for(const shareholderItem of item.shareholders){
            peopleData.filter(function(peopleData) {
                if(peopleData['id'] == shareholderItem.userId){
                    shareholderItem.first_name = peopleData.first_name;
                    shareholderItem.last_name = peopleData.last_name;
                    delete shareholderItem.userId;
                }
            })[0];
        }
    }
    return stocksData;
}

function checkInput(id){
    if (typeof id == 'undefined') {
        throw `String is undefined.`;
    } else if(typeof id != "string"){
        throw `Not a string.`;
    } else if(id.trim().length < 1) {
        throw `Empty String.`
    }
}

async function topShareholder(stockName){
    if(arguments.length != 1) {
        throw `Number of arguments is invalid.`
    }
    checkInput(stockName);
    let peopleData = await getPeople();
    let stocksData = await getStocks();
    let max = -1;
    let localObj = {};
    for(const item of stocksData){
        if(item.stock_name == stockName) {
            if(item.shareholders.length>0){
                for(const shareholderItem of item.shareholders) {
                    if(shareholderItem.number_of_shares > max) {
                        max = shareholderItem.number_of_shares
                        localObj.key = shareholderItem.userId;
                        localObj.val = max;
                    }
                }
            } else{
                return `${stockName} currently has no shareholders.`
            }
            
        }
    }
    if(max==-1) {
        throw `No stock with that name.`;
    }
    for(const peopleItem of peopleData){
        if(localObj.key == peopleItem.id){
            localObj.fname = peopleItem.first_name;
            localObj.lname = peopleItem.last_name;
        }
    }
    return `With ${localObj.val} shares in ${stockName}, ${localObj.fname} ${localObj.lname} is the top shareholder.`
}

async function listStocks(firstName, lastName){
    if(arguments.length != 2) {
        throw `Number of arguments is invalid.`
    }
    checkInput(firstName);
    checkInput(lastName);
    let finalArr = [];
    let userId = "";
    let peopleData = await getPeople();
    let stocksData = await getStocks();
    for(const peopleItem of peopleData){
        if(peopleItem.first_name == firstName && peopleItem.last_name == lastName){
            userId = peopleItem.id;
        } 
    }
    if(userId==""){
        throw `USer not found.`
    } else {
        for(const stocksItem of stocksData){
            for(const shareholderItem of stocksItem.shareholders) {
                if(shareholderItem.userId == userId){
                    let obj = {};
                    obj.stock_name = stocksItem.stock_name;
                    obj.number_of_shares = shareholderItem.number_of_shares;
                    finalArr.push(obj);
                }
            }
        }
    }
    return finalArr;
}

async function getStockById(id){
    if(arguments.length != 1) {
        throw `Number of arguments is invalid.`
    }
    checkInput(id);
    let flag = 0;
    let stocksData = await getStocks();
    for(const item of stocksData){
        if(item.id == id) {
            flag = 1;
            return item;
        }
    }
    if(flag == 0) {
        throw `Stock not found.`;
    }
}

module.exports = {
    listShareholders,
    topShareholder,
    listStocks,
    getStockById
}