const lab2_arrayUtils = require("./arrayUtils");
const lab2_stringUtils = require("./stringUtils");
const lab2_objUtils = require("./objUtils");

console.log("ARRAY")
console.log("Average:")
try {
    console.log(lab2_arrayUtils.average([[1], [2], [3]])); // Returns: 2
} catch(e) {
    console.log(e);
}
try{
    console.log(lab2_arrayUtils.average()); // throws an error
} catch(e) {
    console.log(e);
}



console.log("");
console.log("Mode:");
try{
    console.log(lab2_arrayUtils.modeSquared([1, 2, 3, 3, 4])); // Returns: 9
} catch(e) {
    console.log(e);
}
try{
    console.log(lab2_arrayUtils.modeSquared()); // throws an error
} catch(e){
    console.log(e);
}


console.log("");
console.log("Median:");
try{
    console.log(lab2_arrayUtils.medianElement([6,5,3]));
} catch(e) {
    console.log(e);
}
try{
    console.log(lab2_arrayUtils.medianElement([1,2,"n"])); // throws error
} catch(e) {
    console.log(e);
}



console.log("");
console.log("Merge:");
try{
    console.log(lab2_arrayUtils.merge([1, 2, 3], [3, 1, 2])); // Returns: [1,1,2,2,3,3]
} catch(e) {
    console.log(e);
}
try{
    console.log(lab2_arrayUtils.merge([undefined], [1,2])); // throws
} catch(e) {
    console.log(e);
}


console.log("");
console.log("STRINGS");
console.log("Sort String");
try{
    console.log(lab2_stringUtils.sortString('123 FOO BAR!')); // Returns: "ABFOOR!123  "
} catch(e) {
    console.log(e);
}
try{
    console.log(lab2_stringUtils.sortString(["Hello", "World"])); // Throws Error
} catch(e) {
    console.log(e);
}



console.log("");
console.log("Replace Char");
try{
    console.log(lab2_stringUtils.replaceChar("Daddy", 2)); // Returns: "Daday"
} catch(e) {
    console.log(e);
}
try{
    console.log(lab2_stringUtils.replaceChar("ipsum")); // Throws Error
} catch(e) {
    console.log(e);
}



console.log("");
console.log("Mash up");
try{
    console.log(lab2_stringUtils.mashUp("Patrick", "Hill", "$")); //Returns "PHaitlrli$c$k$"
} catch(e) {
    console.log(e);
}
try{
    console.log(lab2_stringUtils.mashUp ("h","e")); // Throws Error 
} catch(e) {
    console.log(e);
}



console.log("");
console.log("OBJECTS");
console.log("Compute Objects");
try{
    console.log(lab2_objUtils.computeObjects([{ x: 2, y: 3}, { a: 70, x: 4, z: 5 }], x => x * 2)); //{ x: 12, y: 6, a: 140, z: 10 }    
} catch(e){
    console.log(e);
}
try{
    console.log(lab2_objUtils.computeObjects([true, { x: 2, y: 3}], x => x * 2)); //{ x: 12, y: 6, a: 140, z: 10 }    
} catch(e){
    console.log(e);
}

console.log("");
console.log("Common Keys");
const first = {a: 2, b: 4};
const second = {a: 5, b: 4};
const third = {a: 2, b: {x: 7}};
const fourth = {a: 3, b: {x: 7, y: 10}};
try{
    console.log(lab2_objUtils.commonKeys(first, second)); // {b: 4}
} catch(e) {
    console.log(e);
}
try{
    console.log(lab2_objUtils.commonKeys(third)); // {} 
} catch(e) {
    console.log(e);
}


console.log("");
console.log("Flip Object");
try{
    console.log(lab2_objUtils.flipObject({ a: 3, b: 7, c: 5 }));
} catch(e) {
    console.log(e);
}
try{
    console.log(lab2_objUtils.flipObject({ }));
} catch(e) {
    console.log(e);
}