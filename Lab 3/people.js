const axios = require('axios');

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data // this will be the array of people objects
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

async function getPersonById(id){
    if(arguments.length != 1) {
        throw `Number of arguments is invalid.`
    }
    checkInput(id);
    let data = await getPeople();
    //return filterById(data, id);
    let idObj = filterById(data, id);
    if (idObj){
        return idObj;
    } else {
        throw `Person not found`;
    }
}

// Reference :https://stackoverflow.com/questions/8163859/how-can-i-get-data-in-json-array-by-id/14723688
function filterById(jsonObject, id) {
    return jsonObject.filter(function(jsonObject) {
        return (jsonObject['id'] == id);
    })[0];
}
  
async function sameStreet(streetName, streetSuffix){
    if(arguments.length != 2) {
        throw `Number of arguments is invalid.`
    }
    checkInput(streetName);
    checkInput(streetSuffix);
    let finalArr = [];
    let data = await getPeople();

    for(const item of data){
        let homeStreetName = String(item.address.home.street_name);
        let homeStreetSuffix = String(item.address.home.street_suffix);
        let workStreetName = String(item.address.work.street_name);
        let workStreetSuffix = String(item.address.work.street_suffix);
        if(homeStreetName.toLowerCase() == streetName.toLowerCase() 
        && homeStreetSuffix.toLowerCase() == streetSuffix.toLowerCase()){
            finalArr.push(item);
        } else if(workStreetName.toLowerCase() == streetName.toLowerCase() 
        && workStreetSuffix.toLowerCase() == streetSuffix.toLowerCase()) {
            finalArr.push(item);
        }

    }

    if(finalArr.length<2) {
        throw `Less than 2 people.`
    } else {
        return finalArr;
    }
}

async function manipulateSsn(){    
    if(arguments.length != 0) {
        throw `Number of arguments is invalid.`
    }
    let data = await getPeople();
    let ssnArr = [];
    let i = 0;
    let max = -1000000000;
    let min = 1000000000;
    let sum = 0;
    let finalObj = {"highest" : {"firstName":"", "lastName": ""}, "lowest" : {"firstName":"", "lastName": ""}};
    for(const item of data){
        let ssn = item.ssn;
        let arr = ssn.replace(/-/g, '').split('');
        ssnArr.push(arr.sort().join(''));
        sum += parseInt(ssnArr[i]);
        if(parseInt(ssnArr[i]) > max) {
            max = ssnArr[i];
            finalObj["highest"]["firstName"] = item.first_name;
            finalObj["highest"]["lastName"] = item.last_name;
        }
        if(parseInt(ssnArr[i]) < min) {
            min = ssnArr[i];
            finalObj["lowest"]["firstName"] = item.first_name;
            finalObj["lowest"]["lastName"] = item.last_name;
        }
        i++;
    }
    finalObj["average"] = Math.floor(sum/(ssnArr.length));
    return finalObj;
}

function checkInputDate(month, day){
    if (typeof month == 'undefined' && typeof day == 'undefined') {
        throw `Date is undefined.`;
    } else if(isNaN(month) || isNaN(day)) {
        throw `Not an Number.`;
    } else if(!(1<=month) || !(month<=12)){
        throw `Invalid month.`;
    } else if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12) {
        if(day<1 || day>31) {
            throw `Day is invalid.`;
        }
    } else if(month==4 || month==6 || month==9 || month==11) {
        if(day<1 || day>30) {
            throw `Day is invalid.`;
        }
    } else if(month == 2) {
        if(day<1 || day>28) {
            throw `Day is invalid.`;
        }
    }
}

async function sameBirthday(month, day){
    if(arguments.length != 2) {
        throw `Number of arguments is invalid.`
    }
    checkInputDate(month, day);
    let data = await getPeople();
    let finalArr = [];
    for(const item of data) {
        let dateArr = item.date_of_birth.split("/");
        if(dateArr[0] == month && dateArr[1] == day){
            finalArr.push(item.first_name + " " + item.last_name);
        }
    }
    if(finalArr.length<1){
        throw `No birthdays.`;
    } else {
        return finalArr;
    }
}

module.exports = {
    getPersonById,
    sameStreet,
    manipulateSsn,
    sameBirthday
}