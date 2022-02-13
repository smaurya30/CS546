function computeObjects(arr, func){
    checkInput(arr, func, 1);
    let combineObjArr = {};
    for (var i = 0; i < arr.length; i++) {
      let object = arr[i];
      for (const [key, value] of Object.entries(object))
        if (combineObjArr.hasOwnProperty(key)) {
          combineObjArr[key] = combineObjArr[key] + value;
        } else {
          combineObjArr[key] = value;
        }
    }
    for(const [key, value] of Object.entries(combineObjArr)){
        combineObjArr[key] = func(value);
    }
    return combineObjArr;
}

function checkInput(arr, func, flag){
    if(!Array.isArray(arr)) {
        throw `Not an array.`;
    } else if(arr.length == 0) {
        throw `Array is empty.`
    } else if(flag==1 && typeof func != 'function') {
        throw `Not a function.`;
    } else {
        arr.forEach(element => {
            if(Array.isArray(element)){ //typeof element != 'object'
                throw `Array element is not an object.`;
            } else if(Object.keys(element).length == 0) {     // Object.keys(element).length
                throw `Array object is empty.`;
            } else {
                for(const [key, value] of Object.entries(element)){ 
                    if(typeof value != 'number'){
                        throw `Object value is not a number.`;
                    } else if(key.length==0 || value.length==0) { 
                        throw `Object key or value is empty.`;
                    }
                }
            }
        });
    }
}

function checkInputCommonFlip(obj, flag){
    if(Array.isArray(obj) || typeof obj != 'object'){
        throw `Input is not an object.`;
    } else if(flag==1 && Object.keys(obj).length == 0) {
        throw `Object is empty.`;
    }
}

function commonKeys(obj1, obj2){
    checkInputCommonFlip(obj1, 0);
    checkInputCommonFlip(obj2, 0);
    let objFinal = {};
    for(const [key1, value1] of Object.entries(obj1)) {
        for(const[key2, value2] of Object.entries(obj2)){
            if(key1 == key2){
                if(typeof value1 == "object" && typeof value2 == "object"){
                    objFinal[key1] = commonKeys(value1, value2);
                } else if(value1 == value2){
                    objFinal[key1] = value2;
                }
            }
        }
    }
    return objFinal;
}

function flipObject(obj){
    checkInputCommonFlip(obj, 1);
    let objFlipFinal = {}
    for(const[key, value] of Object.entries(obj)){
        if(Array.isArray(value)){
            for(let i=0; i<value.length; i++){
                objFlipFinal[value[i]] = key; 
            }
        } else if(typeof value == "object"){
            objFlipFinal[key] = flipObject(value);
        } else {
            objFlipFinal[value] = key;
        }
    }
    return objFlipFinal;
}

module.exports = {
    computeObjects,
    commonKeys,
    flipObject
}