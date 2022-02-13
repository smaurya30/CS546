const dbConnection = require('../config/mongoConnection');
const restaurantsData = require('../data/restaurants');
const reviewsData = require('../data/reviews');
// const restaurants = data.restaurants;
// const reviews = data.reviews;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  // pending: correct parameters
  const rest = await restaurantsData.create("Pizza Lounge",
  "New York City, New York",
  "999-999-9999",
  "http://www.pizzalounge.com",
  "123",
  ["Italian"],
  { dineIn: false, takeOut: true, delivery: true });
  const id = rest._id;
  await reviewsData.createReview('This place was great!', 'scaredycat', 5, '10/13/2021', 
  'This place was great! the staff is top notch and the food was delicious!  They really know how to treat their customers');
  await reviewsData.createReview(
    'Amazing!', 'twinie', 5, '09/13/2021', 
  'Amazing food!'
  );

  // await reviewsData.addPost(
  //   'Using routes',
  //   'The purpose of today is to simply look at some GET routes',
  //   [],
  //   id
  // );

  console.log('Done seeding database');

  await db.serverConfig.close();
}

main();