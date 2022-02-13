const mongoCollections = require("../config/mongoCollections");
const restaurants = mongoCollections.restaurants;
let { ObjectId } = require("mongodb");

module.exports = {
  async create(
    name,
    location,
    phoneNumber,
    website,
    priceRange,
    cuisines,
    serviceOptions
  ) {
    if (arguments.length != 7) {
      throw `Number of arguments is invalid.`;
    }
    if (
      !name ||
      !location ||
      !phoneNumber ||
      !website ||
      !priceRange ||
      !cuisines ||
      !serviceOptions
    )
      throw `All inputs are not provided.`;
    if (typeof name != "string") throw `Name must be string.`;
    if (typeof location != "string") throw `Location must be string.`;
    if (typeof phoneNumber != "string") throw `PhoneNumber must be string.`;
    if (typeof website != "string") throw `Website must be string.`;
    if (typeof priceRange != "string") throw `Price Range must be string.`;

    if (name.trim().length < 1) throw `Name is empty.`;
    if (location.trim().length < 1) throw `Location is empty.`;
    if (phoneNumber.trim().length < 1) throw `PhoneNumber is empty.`;
    if (website.trim().length < 1) throw `Website is empty.`;
    if (priceRange.trim().length < 1) throw `Price Range is empty.`;

    // Reference: https://www.regextester.com/94189
    let phoneFormat = /^\d{3}-\d{3}-\d{4}$/gm;
    if (!phoneNumber.match(phoneFormat)) throw `Invalid Phone number.`;
    let websiteFormat = /^(http):\/\/(www.)[a-zA-Z0-9]{5,}(.com)$/;
    if (!website.match(websiteFormat)) throw `Invalid Website URL`;

    let priceRangeFormat = priceRange.split("");
    if (priceRangeFormat.length < 1 || priceRangeFormat.length > 4)
      throw `Price out of range.`;
    for (let priceEle of priceRangeFormat) {
      if (priceEle != "$") throw `Invalid Price.`;
    }

    // if(priceRange!='$' || priceRange!='$$' || priceRange!='$$$' || priceRange!='$$$$')
    //   throw `Invalid price range.`;

    if (!Array.isArray(cuisines))
      throw `You must provide an array of cuisines.`;
    if (cuisines.length === 0) throw "You must provide at least one cuisine.";

    for (const cuisine of cuisines) {
      if (typeof cuisine != "string" || cuisine.trim().length < 1)
        throw `Cuisines are not a string.`;
    }

    if (typeof serviceOptions != "object")
      throw `Service Options is not an object.`;
    if (!serviceOptions.hasOwnProperty("dineIn"))
      throw `Service options does not have dineIn.`;
    if (!serviceOptions.hasOwnProperty("takeOut"))
      throw `Service options does not have takeOut.`;
    if (!serviceOptions.hasOwnProperty("delivery"))
      throw `Service options does not have delivery.`;

    for (const [key, value] of Object.entries(serviceOptions)) {
      if (typeof value != "boolean") throw `Service options are not boolean.`;
    }

    let overallRating = 0;
    let reviews = [];
    const restaurantCollection = await restaurants();
    let newRestaurant = {
      name,
      location,
      phoneNumber,
      website,
      priceRange,
      cuisines,
      overallRating,
      serviceOptions,
      reviews,
    };
    const insertInfo = await restaurantCollection.insertOne(newRestaurant);
    if (!insertInfo.acknowledged == true) throw `Could not add restraunt.`;
    let insertedRestraunt = await this.get(insertInfo.insertedId.toString());
    insertedRestraunt = convertObjectIdToString(insertedRestraunt);
    return insertedRestraunt;
  },

  async get(id) {
    if (arguments.length != 1) {
      throw `Number of arguments is invalid.`;
    }
    checkId(id);
    isValidObjectId(id);

    const restaurantCollection = await restaurants();
    let restrauntIdObj = await restaurantCollection.findOne({
      _id: ObjectId(id),
    });
    if (restrauntIdObj === null) throw `No restaurant with that id.`;
    restrauntIdObj = convertObjectIdToString(restrauntIdObj);
    return restrauntIdObj;
  },

  async getAll() {
    const restaurantCollection = await restaurants();
    let restaurantList = await restaurantCollection.find({}).toArray();
    let restaurantListUpdated = [];
    for (let restaurantObj of restaurantList) {
      restaurantObj = convertObjectIdToStringGetAll(restaurantObj);
      restaurantListUpdated.push(restaurantObj);
    }
    return restaurantListUpdated;
  },

  async remove(id) {
    if (arguments.length != 1) {
      throw `Number of arguments is invalid.`;
    }
    checkId(id);
    isValidObjectId(id);

    const restaurantCollection = await restaurants();
    let restaurantName = await restaurantCollection.findOne({
      _id: ObjectId(id),
    });
    if (restaurantName === null) throw `No restaurant with that id.`;
    restaurantName = restaurantName.name;
    const deletedRestaurant = await restaurantCollection.deleteOne({
      _id: ObjectId(id),
    });
    if (!deletedRestaurant.acknowledged == true)
      throw `Could not delete restautant.`;

    let deletedObj = {};
    deletedObj.reviewId = id;
    deletedObj.deleted = true;
    return deletedObj;
  },

  async update(
    id,
    name,
    location,
    phoneNumber,
    website,
    priceRange,
    cuisines,
    serviceOptions
  ) {
    if (arguments.length != 8) {
      throw `Number of arguments is invalid.`;
    }
    if (
      !id ||
      !name ||
      !location ||
      !phoneNumber ||
      !website ||
      !priceRange ||
      !cuisines ||
      !serviceOptions
    )
      throw `All inputs are not provided.`;
    if (typeof id != "string") throw `ID must be string.`;
    if (typeof name != "string") throw `Name must be string.`;
    if (typeof location != "string") throw `Location must be string.`;
    if (typeof phoneNumber != "string") throw `PhoneNumber must be string.`;
    if (typeof website != "string") throw `Website must be string.`;
    if (typeof priceRange != "string") throw `Price Range must be string.`;

    if (id.trim().length < 1) throw `ID is empty.`;
    if (name.trim().length < 1) throw `Name is empty.`;
    if (location.trim().length < 1) throw `Location is empty.`;
    if (phoneNumber.trim().length < 1) throw `PhoneNumber is empty.`;
    if (website.trim().length < 1) throw `Website is empty.`;
    if (priceRange.trim().length < 1) throw `Price Range is empty.`;

    let phoneFormat = /^\d{3}-\d{3}-\d{4}$/gm;
    if (!phoneNumber.match(phoneFormat)) throw `Invalid Phone number.`;
    let websiteFormat = /^(http):\/\/(www.)[a-zA-Z0-9]{5,}(.com)$/;
    if (!website.match(websiteFormat)) throw `Invalid Website URL`;

    let priceRangeFormat = priceRange.split("");
    if (priceRangeFormat.length < 1 || priceRangeFormat.length > 4)
      throw `Price out of range.`;
    for (let priceEle of priceRangeFormat) {
      if (priceEle != "$") throw `Invalid Price.`;
    }

    if (!Array.isArray(cuisines))
      throw `You must provide an array of cuisines.`;
    if (cuisines.length === 0) throw "You must provide at least one cuisine.";

    for (const cuisine of cuisines) {
      if (typeof cuisine != "string" || cuisine.trim().length < 1)
        throw `Cuisines are not a string.`;
    }

    if (typeof serviceOptions != "object")
      throw `Service Options is not an object.`;
    if (!serviceOptions.hasOwnProperty("dineIn"))
      throw `Service options does not have dineIn.`;
    if (!serviceOptions.hasOwnProperty("takeOut"))
      throw `Service options does not have takeOut.`;
    if (!serviceOptions.hasOwnProperty("delivery"))
      throw `Service options does not have delivery.`;

    for (const [key, value] of Object.entries(serviceOptions)) {
      if (typeof value != "boolean") throw `Service options are not boolean.`;
    }

    const restaurantCollection = await restaurants();

    let restaurantWebsite = await restaurantCollection.findOne({
      _id: ObjectId(id),
    });
    if (restaurantWebsite === null) throw `No restaurant with that id.`;

    const updateRestaurant = {
      // id: id,
      name: name,
      location: location,
      phoneNumber: phoneNumber,
      website: website,
      priceRange: priceRange,
      cuisines: cuisines,
      serviceOptions: serviceOptions,
      overallRating: restaurantWebsite.overallRating,
      reviews: restaurantWebsite.reviews,
    };
    const updatedRestaurant = await restaurantCollection.updateOne(
      { _id: ObjectId(id) },
      { $set: updateRestaurant }
    );
    if (!updatedRestaurant.acknowledged == true)
      throw `Could not update Restaurant website successfully.`;

    let updatedRestData = await this.get(id);
    updatedRestData = convertObjectIdToString(updatedRestData);
    return updatedRestData;
  },
};

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

function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) != id) throw `Object Id not valid string.`;
  } else {
    throw `Object Id not valid.`;
  }
}

function checkId(id) {
  if (!id) throw `ID is not provided.`;
  if (typeof id != "string") throw `ID must be string.`;
  if (id.trim().length < 1) throw `ID is empty.`;
}
