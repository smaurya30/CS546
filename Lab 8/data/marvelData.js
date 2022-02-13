const axios = require('axios');
const md5 = require('blueimp-md5');

async function getData(searchTerm) {
    
    const publickey = '6afa808fafae8ad16c5810b053c62d09';
    const privatekey = 'f79088f4c3c19ddf640bf555f76a22050cbd2ad5';
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
    const url = baseUrl + '?nameStartsWith=' + searchTerm + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

    const { data } = await axios.get(url);

    if(data.data.results.length == 0) throw `No results found.`;
    
    if(data.data.results.count >20){
        data = data.slice(0,20);
    }
    
    return data.data.results;

}

async function getDataById(id) {
    
    const publickey = '6afa808fafae8ad16c5810b053c62d09';
    const privatekey = 'f79088f4c3c19ddf640bf555f76a22050cbd2ad5';
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
    const url = baseUrl + '/' + id + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

    // const {}  creates a read-only reference to a value
    const { data } = await axios.get(url);
    //dataList = data.map(movie => ({id: movie.id, name:movie.name}))

    //if(!data.data.count == 0) throw `No results found.`;
    
    // if(data.data.results.count >20){
    //     data = data.slice(0,20);
    // }
    
    return data.data.results[0];

}

module.exports = {
    getData,
    getDataById
}