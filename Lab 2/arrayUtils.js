function average(arr){
    checkArray(arr, 1);
    // Reference: https://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays
    arr = arr.flat(1);
    let sum = 0;
    for(let i=0; i<arr.length; i++){
        sum += arr[i];
    }
    return sum/arr.length;
}

function checkArray(arr, flag) {
    // If flag=1 then make the check else don't
    if(!Array.isArray(arr)) {
        throw `Not an array.`;
    } else if(arr.length == 0) {
        throw `Array is empty.`
    } else { 
        arr.forEach(element => {
            if(flag==1 && !Array.isArray(element)) {
                throw `Not Array of Arrays.`
            } else if(flag==1 && element.length == 0) {
                throw `Array of Array is empty.`;
            } else if(flag==1) {
                element.forEach(item => {
                    if(typeof item != 'number') {
                        throw `Not a number.`;
                    }
                })
            } else{
                if(flag==0 && typeof element != 'number'){
                    throw `Not a number.`;
                }
                if(flag==2 && typeof element != 'number' && typeof element != 'string'){
                    throw `Not a number or char.`;
                } else if(flag==2 && typeof element == 'string' && element.length>1){
                    throw `Char length more than 1.`;
                }
            }
        });
    }
}

function modeSquared(arr){
    checkArray(arr, 0);
    let modeObjCount = {};
    let freq = 1;
    let keyOfMode = null;
    arr.forEach(element => {
        if(modeObjCount.hasOwnProperty(element)) {
            modeObjCount[element] += 1;
        } else {
            modeObjCount[element] = 1;
        }
    });
    for(const [key, value] of Object.entries(modeObjCount)) {
        if(value > freq){
            freq = value;
            keyOfMode = key;
        }
    }
    if(keyOfMode!=null){
        let arrOfModes = Math.pow(keyOfMode,2);
        // Reference: https://stackoverflow.com/questions/32648153/finding-the-modes-of-an-array-javascript
        for(const [key, value] of Object.entries(modeObjCount)) {
            if(key!=keyOfMode && freq==value){
                arrOfModes += Math.pow(key,2);
            }
        }
        return arrOfModes;
    } else{
        return 0;
    }
}

function medianElement(arr) {
    checkArray(arr, 0);
    let originalArr = [...arr];
    arr = arr.sort();
    let idx=-1;
    let median = 0;
    let medianObj = {};
    if(arr.length % 2 == 0){
        idx = arr.length/2;
        median = (arr[idx] + arr[idx-1])/2;
        if(originalArr.indexOf(arr[idx]) > originalArr.indexOf(arr[idx-1])){
            medianObj[median] = originalArr.indexOf(arr[idx]);
        } else {
            medianObj[median] = originalArr.indexOf(arr[idx-1]);
        }
    } else {
        idx = Math.floor(arr.length/2);
        median = arr[idx];
        medianObj[median] = originalArr.indexOf(median);
    }
    let minIdx = -1;
    for(let i=0; i<originalArr.length; i++){
        if(i!=medianObj[median] && median==originalArr[i]){
            if(medianObj[median] > i){
                medianObj[medianObj] = i;
            }
        }
    }
    return medianObj;
}

function merge(arrayOne, arrayTwo){
    checkArray(arrayOne, 2);
    checkArray(arrayTwo, 2);
    let arr = arrayOne.concat(arrayTwo);
    let lowerAlpha = [];
    let upperAlpha = [];
    let nums = [];
    arr.forEach(element => {
        if(97<=element.toString().charCodeAt(0) && element.toString().charCodeAt(0)<=122){
            lowerAlpha.push(element);
        } else if(65<=element.toString().charCodeAt(0) && element.toString().charCodeAt(0)<=90) {
            upperAlpha.push(element);
        } else if(48<=element.toString().charCodeAt(0) && element.toString().charCodeAt(0)<=57){
            nums.push(element);
        }
    });
    lowerAlpha = lowerAlpha.sort();
    upperAlpha = upperAlpha.sort();
    nums = nums.sort();
    lowerAlpha = lowerAlpha.concat(upperAlpha);
    lowerAlpha = lowerAlpha.concat(nums);
    return lowerAlpha;
}

  

module.exports = {
    average,
    modeSquared,
    medianElement,
    merge
}