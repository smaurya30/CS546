const restaurants = require("./data/restaurants");

async function main() {
  console.log("Create");
  const createRestaurant = await restaurants.create(
    "The Saffron Lounge",
    "New York City, New York",
    "123-456-7890",
    "http://www.saffronlounge.com",
    "1234",
    ["Cuban", "Italian"],
    3,
    { dineIn: true, takeOut: true, delivery: false }
  );
  console.log(createRestaurant);

  const createRestaurantTwo = await restaurants.create(
    "Pizza Lounge",
    "New York City, New York",
    "999-999-9999",
    "http://www.pizzalounge.com",
    "123",
    ["Italian"],
    5,
    { dineIn: false, takeOut: true, delivery: true }
  );

  console.log("");
  console.log("Get All");
  const getAllRestaurant = await restaurants.getAll();
  console.log(getAllRestaurant);

  const createRestaurantThree = await restaurants.create(
    "Black Bear",
    "Hoboken, New Jersey",
    "456-789-0123",
    "http://www.blackbear.com",
    "12",
    ["Cuban", "American"],
    4,
    { dineIn: true, takeOut: true, delivery: true }
  );
  console.log(createRestaurantThree);

  console.log("");
  console.log("Update website by Id");
  const updateRestaurantWebsite = await restaurants.rename(
    createRestaurant._id,
    "http://www.updatedsaffronlounge.com"
  );
  console.log(updateRestaurantWebsite);

  console.log("");
  console.log("Remove by Id");
  const removeRestaurantById = await restaurants.remove(
    createRestaurantTwo._id
  );
  //   console.log(removeRestaurantById);

  console.log("");
  console.log("Get All");
  const getAllRestaurantAgain = await restaurants.getAll();
  console.log(getAllRestaurantAgain);

  try {
    const createRestaurantFour = await restaurants.create(
      "Pizza Lounge",
      "New York City, New York",
      "999-999-99992",
      "http://www.piz.com",
      "123",
      ["Italian"],
      5,
      { dineIn: false, takeOut: true, delivery: true }
    );
  } catch (e) {
    console.log("Got an error!");
    console.log(e);
  }
  
  try {
    console.log("");
    console.log("Remove by Id");
    const removeRestaurantByIdbad = await restaurants.remove(
      "ACDA6164c9d8e398finally"
    );
    console.log(removeRestaurantByIdbad);
  } catch (e) {
    console.log("Got an error!");
    console.log(e);
  }

  try {
    console.log("");
    console.log("Update website by Id");
    const updateRestaurantWebsiteTwo = await restaurants.rename(
      "ACDA6164c9d8e398finally",
      "http://www.updatedsaffronloungebad.com"
    );
    console.log(updateRestaurantWebsiteTwo);
  } catch (e) {
    console.log("Got an error!");
    console.log(e);
  }

  try {
    console.log("");
    console.log("Update website by Id");
    const updateRestaurantWebsiteThree = await restaurants.rename(
      123,
      "http://www.saffronloungenew.com"
    );
    console.log(updateRestaurantWebsiteThree);
  } catch (e) {
    console.log("Got an error!");
    console.log(e);
  }

  try {
    console.log("");
    console.log("Get by Id");
    const getRestaurantById = await restaurants.get("ACDA6164c9d8e398finally");
    console.log(getRestaurantById);
  } catch (e) {
    console.log("Got an error!");
    console.log(e);
  }

  console.log("checking");
  try{
  const createRestaurantChecking = await restaurants.create(
    'The Saffron Lounge',
    'Hoboken, New Jersey',
    '456-789-0123',
    'http://www.saffronlounge.com',
    '$$$',
    ['Cuban'],
    4,
    {dineIn: true, takeOut: true, delivery: false} 
    );
  console.log(createRestaurantChecking);
  } catch(e) {
    console.log(e);
  }

  try {
    console.log("");
    console.log("Get by Id");
    const getRestaurantById = await restaurants.get("foobar");
    console.log(getRestaurantById);
  } catch (e) {
    console.log("Got an error!");
    console.log(e);
  }

  try {
    console.log("");
    console.log("Get by Id");
    const getRestaurantById = await restaurants.get("0324");
    console.log(getRestaurantById);
  } catch (e) {
    console.log("Got an error!");
    console.log(e);
  }

  try {
    console.log("HEREEEEEEEE");
    console.log("Update website by Id");
    const updateRestaurantWebsiteThree = await restaurants.rename(
      "invalid", "http://www.google.com"
    );
    console.log(updateRestaurantWebsiteThree);
  } catch (e) {
    console.log("Got an error!");
    console.log(e);
  }

  try {
    console.log("");
    console.log("Remove by Id");
    const removeRestaurantByIdbad = await restaurants.remove(
      "foobar"
    );
    console.log(removeRestaurantByIdbad);
  } catch (e) {
    console.log("Got an error!");
    console.log(e);
  }
}

main().catch((error) => {
  console.log(error);
});
