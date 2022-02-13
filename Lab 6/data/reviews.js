const mongoCollections = require("../config/mongoCollections");
const restaurants = mongoCollections.restaurants;
let { ObjectId } = require("mongodb");
const restaurantData = require("./restaurants");

module.exports = {
  async createReview(
    restaurantId,
    title,
    reviewer,
    rating,
    dateOfReview,
    review
  ) {
    if (arguments.length != 6) {
      throw `Number of arguments is invalid.`;
    }

    if (
      !restaurantId ||
      !title ||
      !reviewer ||
      !rating ||
      !dateOfReview ||
      !review
    )
      throw `All inputs are not provided.`;

    if (typeof restaurantId != "string") throw `Name must be string.`;
    if (typeof title != "string") throw `Location must be string.`;
    if (typeof reviewer != "string") throw `PhoneNumber must be string.`;
    if (typeof dateOfReview != "string") throw `Website must be string.`;
    if (typeof review != "string") throw `Price Range must be string.`;
    if (typeof rating != "number") throw `Rating must be number.`;

    if (restaurantId.trim().length < 1) throw `Name is empty.`;
    if (title.trim().length < 1) throw `Location is empty.`;
    if (reviewer.trim().length < 1) throw `PhoneNumber is empty.`;
    if (dateOfReview.trim().length < 1) throw `Website is empty.`;
    if (review.trim().length < 1) throw `Price Range is empty.`;

    // if (!isValidObjectId(restaurantId)) throw `Invalid Object Id.`;
    if (rating < 1 || rating > 5) throw `Rating is out of range.`;

    if (!isValidDate(dateOfReview)) throw `Invalid Date of Review.`;

    const restaurantCollection = await restaurants();

    let constRestaurantId = await restaurantCollection.findOne({
      _id: ObjectId(restaurantId),
    });

    if (constRestaurantId === null) throw `No restaurant with that id.`;
    let newReview = {
      // restaurantId,
      _id: ObjectId(),
      title,
      reviewer,
      rating,
      dateOfReview,
      review,
    };

    const addRestaurantReview = {
      reviews: newReview,
    };

    const reviewRemoved = await restaurantCollection.updateOne(
      { _id: ObjectId(restaurantId) },
      { $addToSet: addRestaurantReview }
    );
    if (!reviewRemoved.acknowledged == true)
      throw `Could not add review for the restaurant.`;
    else {
      let createdReview = await restaurantData.get(restaurantId);
      let sum = 0;
      for (let i = 0; i < createdReview.reviews.length; i++) {
        sum += Number(createdReview.reviews[i].rating);
      }
      let averageRating = Number(sum / createdReview.reviews.length).toFixed(2);
      const ratingUpdated = await restaurantCollection.updateOne(
        { _id: ObjectId(restaurantId) },
        { $set: { overallRating: averageRating } }
      );
      if (!ratingUpdated.acknowledged == true)
        throw `Over all rating as not updated.`;

      let insertedReview = await restaurantData.get(restaurantId);
      insertedReview = convertObjectIdToString(insertedReview);
      let insertedReviewArr = [];
      for(let reviewList of insertedReview.reviews){
        reviewList = convertObjectIdToString(reviewList);
        insertedReviewArr.push(reviewList);
      }
      insertedReview.reviews = insertedReviewArr;
      return insertedReview;
    }
  },

  async getAll(restaurantId) {
    if (arguments.length != 1) {
      throw `Number of arguments is invalid.`;
    }
    checkId(restaurantId);
    isValidObjectId(restaurantId);

    const restaurantCollection = await restaurants();
    let restrauntIdObj = await restaurantCollection.findOne({
      _id: ObjectId(restaurantId),
    });
    if (restrauntIdObj === null) throw `No restaurant with that id.`;
    let reviewArr = [];
    for (let i = 0; i < restrauntIdObj.reviews.length; i++) {
      reviewArr.push(convertObjectIdToString(restrauntIdObj.reviews[i]));
    }

    return reviewArr;
  },

  async get(reviewId) {
    const restaurantCollection = await restaurants();
    let restaurantList = await restaurantCollection.find({}).toArray();
    let flag = 1;
    for (let restaurant of restaurantList) {
      for (let review of restaurant.reviews) {
        if (review._id.toString() == reviewId) {
          flag = 0;
          review = convertObjectIdToString(review);
          return review;
        }
      }
    }
    if (flag == 1) throw `Review not found.`;
  },

  async remove(reviewId) {
    const restaurantCollection = await restaurants();
    let restaurantList = await restaurantCollection.find({}).toArray();
    let flag = 1;
    for (let restaurant of restaurantList) {
      for (let review of restaurant.reviews) {
        if (review._id.toString() == reviewId) {
          flag = 0;
          const reviewRemoved = await restaurantCollection.updateOne(
            { _id: ObjectId(restaurant._id) },
            { $pull: { reviews: review } }
          );
          if (!reviewRemoved.acknowledged == true)
            throw `Could not remove review for the restaurant.`;
          else {
            let deletedReview = await restaurantData.get(
              restaurant._id.toString()
            );
            let sum = 0;
            for (let i = 0; i < deletedReview.reviews.length; i++) {
              sum += Number(deletedReview.reviews[i].rating);
            }
            let averageRating = Number(
              sum / deletedReview.reviews.length
            ).toFixed(2);

            const ratingUpdated = await restaurantCollection.updateOne(
              { _id: ObjectId(deletedReview._id) },
              { $set: { overallRating: averageRating } }
            );
            if (!ratingUpdated.acknowledged == true)
              throw `Over all rating as not updated.`;
            let deletedObj = {};
            deletedObj.reviewId = reviewId;
            deletedObj.deleted = true;
            return deletedObj;
          }
        }
      }
    }
    if (flag == 1) throw `Review not found.`;
  },
};

// Reference: https://www.geeksforgeeks.org/how-to-check-if-a-string-is-valid-mongodb-objectid-in-node-js/
function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) !== id) throw `Object Id not valid string.`;
  } else {
    throw `Object Id not valid.`;
  }
}

function convertObjectIdToString(restaurantObj) {
  restaurantObj._id = restaurantObj._id.toString();
  return restaurantObj;
}

function convertObjectIdToStringGetAll(restaurantObj) {
  let newObj = {};
  newObj._id = restaurantObj._id.toString();
  newObj.name = restaurantObj.name;

  return newObj;
}

function checkId(id) {
  if (!id) throw `ID is not provided.`;
  if (typeof id != "string") throw `ID must be string.`;
  if (id.trim().length < 1) throw `ID is empty.`;
}

// Reference: https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
function isValidDate(dateString) {
  // Current date
  // Reference: https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript?rq=1
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  // First check for the pattern
  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

  // Parse the date parts to integers
  var parts = dateString.split("/");
  var day = parseInt(parts[1], 10);
  var month = parseInt(parts[0], 10);
  var year = parseInt(parts[2], 10);

  if (year != yyyy || month != parseInt(mm) || day != parseInt(dd))
    return false;

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

  var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
}
