const questionOne = function questionOne(arr) {
    // Implement question 1 here
    let obj = {};
    for(let i=0; arr!==undefined && i<arr.length; i++){
        let result = (Math.abs(Math.pow(arr[i], 2) - 7));
        let num = Math.round(result/2);

        obj[result] = true;
        for(let j=2; j<=num; j++){
            if(result%j == 0){
                obj[result] = false;
            }
            if(result==0 || result==1){
                obj[result] = false;
            }
        }
    }
    return obj;
}

const questionTwo = function questionTwo(arr) { 
    // Implement question 2 here
    if(arr===undefined || arr.length<1){
        return [];
    } else{
        // Reference: https://codeburst.io/javascript-array-distinct-5edc93501dc4
        let distinct_arr = [...new Set(arr)]
        return distinct_arr;
    }
}

const questionThree = function questionThree(arr) {
    // Implement question 3 here
    // Reference: https://medium.com/coding-in-simple-english/how-to-find-unique-strings-in-an-array-using-javascript-e698b7957736
    let unique_set = new Set(arr);
    let sorted_arr = [...unique_set];
    let sorted_arr_copy = [...sorted_arr];
    for(let i=0; i<sorted_arr.length; i++){
        // Reference: https://codehandbook.org/sorting-string-letters-in-alphabetical-order-using-javascript/
        let arr_ele = sorted_arr[i].split('');
        sorted_arr[i] = (arr_ele.sort().join(''));
    }
    // Reference: https://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript
    const counts = {};
    sorted_arr.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });

    for(const [key, value] of Object.entries(counts)){
        if(value<2){
            delete counts[key];
        }
    }
    let idx_obj = {};
    for(const [key, value] of Object.entries(counts)){
        idx_obj[key] = [];
        for(let m=0; m<sorted_arr.length; m++){
            if(sorted_arr[m]==key){
                idx_obj[key].push(sorted_arr_copy[m]);
            }
        }
    }
    return idx_obj;
}

const questionFour = function questionFour(num1, num2, num3) {
    // Implement question 4 here
    let avg = (num1 + num2 + num3)/3;
    let add_fact = factorial(num1) + factorial(num2) + factorial(num3);
    return Math.floor(add_fact/avg);
}
// Reference: https://www.freecodecamp.org/news/how-to-factorialize-a-number-in-javascript-9263c89a4b38/
function factorial(nums) {
    if(nums<0){
        return -1;
    } else if(nums==0) {
        return 1;
    } else {
        return nums * factorial(nums-1);
    }
}

module.exports = {
    firstName: "SHIVANI", 
    lastName: "MAURYA", 
    studentId: "10465236",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};