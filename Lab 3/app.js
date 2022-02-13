const people = require("./people");
const stocks = require("./stocks");
const utils = require("util");

async function main(){
    utils.inspect.defaultOptions.depth = null;
    console.log("PEOPLE");
    console.log("GET PERSON BY ID");
    try{
        const peopledata = await people.getPersonById("7989fa5e-8f3f-458d-ad58-23c8d9ef5a10");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.getPersonById("eeeee");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.getPersonById();
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.getPersonById("     ");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    console.log("");
    console.log("SAME STREET");
    try{
        const peopledata = await people.sameStreet("Sutherland", "Point");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameStreet("Sutherland", "");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameStreet();
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameStreet("Sutherland", "Point", "Point");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameStreet(1,"Street");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameStreet("Street", 1);
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameStreet("Street");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameStreet("Crownhardt","Park");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    console.log("");
    console.log("MANIPULATE SSN");
    try{
        const peopledata = await people.manipulateSsn();
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    console.log("");
    console.log("SAME BIRTHDAY");
    try{
        const peopledata = await people.sameBirthday(09, 25);
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameBirthday(9, 25);
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameBirthday("09", "25");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameBirthday("   ", "25");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameBirthday(09, 31);
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameBirthday(13, 25);
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameBirthday(02, 29);
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameBirthday("09", "31");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameBirthday("      ", "25");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameBirthday("month", "day");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    try{
        const peopledata = await people.sameBirthday("1", "1");
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
    console.log("");
    console.log("STOCKS");
    console.log("LIST SHAREHOLDERS");
    try{
        const stocksdata = await stocks.listShareholders();
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }
    console.log("");
    console.log("TOP SHAREHOLDER");
    try{
        const stocksdata = await stocks.topShareholder('Aeglea BioTherapeutics, Inc.');
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stocksdata = await stocks.topShareholder('Nuveen Floating Rate Income Fund');
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stocksdata = await stocks.topShareholder('Powell Industries, Inc.');
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stocksdata = await stocks.topShareholder(43);
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stocksdata = await stocks.topShareholder('    ');
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stocksdata = await stocks.topShareholder('Foobar Inc');
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stocksdata = await stocks.topShareholder();
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }
    console.log("");
    console.log("LIST STOCKS");
    try{
        const stocksdata = await stocks.listStocks("Grenville", "Pawelke");
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stocksdata = await stocks.listStocks('Patrick', "Hill");
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stocksdata = await stocks.listStocks();
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stocksdata = await stocks.listStocks("foo");
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stocksdata = await stocks.listStocks("      ", "        ");
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stocksdata = await stocks.listStocks(1,2);
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }
    console.log("");
    console.log("GET STOCK BY ID");
    try{
        const stocksdata = await stocks.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0");
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stocksdata = await stocks.getStockById(-1);
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stocksdata = await stocks.getStockById(1001);
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stocksdata = await stocks.getStockById();
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }
    try{
        const stocksdata = await stocks.getStockById('7989fa5e-5617-43f7-a931-46036f9dbcff');
        console.log (stocksdata);
    }catch(e){
        console.log (e);
    }
}

main();