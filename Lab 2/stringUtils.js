function sortString(str){
    checkInput(str, 0);
    let strArr = str.split("");
    let lowerAlpha = [];
    let upperAlpha = [];
    let nums = [];
    let space = [];
    let spclChar = [];
    strArr.forEach(element => {
        if(97<=element.toString().charCodeAt(0) && element.toString().charCodeAt(0)<=122){
            lowerAlpha.push(element);
        } else if(65<=element.toString().charCodeAt(0) && element.toString().charCodeAt(0)<=90) {
            upperAlpha.push(element);
        } else if(48<=element.toString().charCodeAt(0) && element.toString().charCodeAt(0)<=57){
            nums.push(element);
        } else if(element.toString().charCodeAt(0) == 32){
            space.push(element);
        } else if(33<=element.toString().charCodeAt(0) && element.toString().charCodeAt(0)<=47 
        && 58<=element.toString().charCodeAt(0) && element.toString().charCodeAt(0)<=64
        && 91<=element.toString().charCodeAt(0) && element.toString().charCodeAt(0)<=96
        && 123<=element.toString().charCodeAt(0) && element.toString().charCodeAt(0)<=126){
            spclChar.push(element);
        }
    });
    lowerAlpha = lowerAlpha.sort().join('');
    upperAlpha = upperAlpha.sort().join('');
    nums = nums.sort().join('');
    space = space.sort().join('');
    spclChar = spclChar.sort().join('');
    let finalStr = upperAlpha.concat(lowerAlpha, spclChar, nums, space);
    return finalStr;
}

function checkInput(str, flag){
    if(flag==0 && typeof str == 'undefined') {
        throw `String is undefined.`;
    } else if(flag==0 && typeof str != "string"){
        throw `Not a string.`;
    } else if(flag==0 && str.trim().length < 1) {
        throw `Empty String.`
    } else if(flag==1 && typeof str == 'undefined') {
        throw `Index is undefined.`;
    } else if(flag==1 && typeof str != 'number'){
        throw `Index is not a number.`;
    } else if(flag==1 && (str==0 || str==(str.length-1))) {
        throw `Index out of bound.`;
    }
}

function replaceChar(str, idx){
    checkInput(str, 0);
    checkInput(idx, 1);
    let strArr = str.split("");
    strArr[idx+1] = strArr[idx-1];
    str = strArr.join("");
    return str;
}

function mashUp(string1, string2, char){
    checkInput(string1, 0);
    checkInput(string2, 0);
    checkInput(char, 0);
    let finalStr = "";
    if(char.length > 1){
        throw "error";
    }
    if(string1.length < string2.length){
        let lengthDiff = string2.length - string1.length;
        for(let i=0; i<lengthDiff; i++){
            string1 = string1.concat(char);
        }
    } else if(string2.length < string1.length){
        let lengthDiff = string1.length - string2.length;
        for(let k=0; k<lengthDiff; k++){
            string2 = string2.concat(char);
        }
    }
    for(let j=0; j<string1.length; j++){
        let localStr = "";
        finalStr = finalStr.concat(string1.charAt(j), string2.charAt(j));
    }
    return finalStr;
}

module.exports = {
    sortString,
    replaceChar,
    mashUp
}