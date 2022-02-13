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
    overallRating,
    serviceOptions
  ) {
    if(arguments.length != 8) {
        throw `Number of arguments is invalid.`
    }
    if (
      !name ||
      !location ||
      !phoneNumber ||
      !website ||
      !priceRange ||
      !cuisines ||
      !overallRating ||
      !serviceOptions
    )
      throw `All inputs are not provided.`;
    if (typeof name != "string") throw `Name must be string.`;
    if (typeof location != "string") throw `Location must be string.`;
    if (typeof phoneNumber != "string") throw `PhoneNumber must be string.`;
    if (typeof website != "string") throw `Website must be string.`;
    if (typeof priceRange != "string") throw `Price Range must be string.`;
    if (typeof overallRating != "number")
      throw `Overall Rating must be number.`;

    if (name.trim().length < 1) throw `Name is empty.`;
    if (location.trim().length < 1) throw `Location is empty.`;
    if (phoneNumber.trim().length < 1) throw `PhoneNumber is empty.`;
    if (website.trim().length < 1) throw `Website is empty.`;
    if (priceRange.trim().length < 1) throw `Price Range is empty.`;
    if (overallRating < 0 || overallRating > 5)
      throw `Overall Rating is out of range.`;

    // Reference: https://www.regextester.com/94189
    let phoneFormat = /^\d{3}-\d{3}-\d{4}$/gm;
    if (!phoneNumber.match(phoneFormat)) throw `Invalid Phone number.`;
    let websiteFormat = /^(http):\/\/(www.)[a-zA-Z0-9]{5,}(.com)$/;
    if (!website.match(websiteFormat)) throw `Invalid Website URL`;

    // Did not include https
    // let websiteFormat = /^(http|https):\/\/(www.)[a-zA-Z0-9]{5,}(.com)$/;

    // Reference: https://stackoverflow.com/questions/54558285/regular-expression-4-digits-with-optional-1-or-2-decimal-places
    let priceRangeFormat = /^(([0-9]{1,4})(\.[0-9]{1,2})?)$/;
    if (!priceRange.match(priceRangeFormat)) throw `Invalid Price range.`;

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
    //     console.log(key)
    //     console.log(value)
    //   if (!key.trim().length < 1) throw `Service option key is empty.`;
    //   if (!value.trim().length < 1) throw `Service option value is empty.`;
      if (typeof value != "boolean") throw `Service options are not boolean.`;
    }

    try {
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
      };
      const insertInfo = await restaurantCollection.insertOne(newRestaurant);
      if (insertInfo.insertedCount === 0) throw `Could not add restraunt.`;
      let insertedRestraunt = await this.get(insertInfo.insertedId.toString());
      insertedRestraunt = convertObjectIdToString(insertedRestraunt);
      return insertedRestraunt;
    } catch (e) {
      console.log("Got an error!");
      console.log(e);
    }
  },

  async get(id) {
    if(arguments.length != 1) {
        throw `Number of arguments is invalid.`
    }
    checkId(id);
    
    try {
      const restaurantCollection = await restaurants();
      let restrauntIdObj = await restaurantCollection.findOne({
        _id: ObjectId(id),
      });
      if (restrauntIdObj === null) throw `No restaurant with that id.`;
      restrauntIdObj = convertObjectIdToString(restrauntIdObj);
      return restrauntIdObj;
    } catch (e) {
      console.log("Got an error!");
      console.log(e);
    }
  },

  async getAll() {
    try {
      const restaurantCollection = await restaurants();
      let restaurantList = await restaurantCollection.find({}).toArray();
      let restaurantListUpdated = [];
      for (let restaurantObj of restaurantList) {
        restaurantObj = convertObjectIdToString(restaurantObj);
        restaurantListUpdated.push(restaurantObj);
      }
      return restaurantList;
    } catch (e) {
      console.log("Got an error!");
      console.log(e);
    }
  },

  async remove(id) {
    if(arguments.length != 1) {
        throw `Number of arguments is invalid.`
    }
    checkId(id);

    try {
      const restaurantCollection = await restaurants();
      let restaurantName = await restaurantCollection.findOne({
        _id: ObjectId(id),
      });
      if (restaurantName === null) throw `No restaurant with that id.`;
      restaurantName = restaurantName.name;
      const deletedRestaurant = await restaurantCollection.deleteOne({
        _id: ObjectId(id),
      });
      if (deletedRestaurant.deletedCount === 0)
        throw `Could not delete restautant with id of ${id}.`;
      return `${restaurantName} has been successfully deleted!`;
    } catch (e) {
      console.log("Got an error!");
      console.log(e);
    }
  },

  async rename(id, newWebsite) {
    if(arguments.length != 2) {
        throw `Number of arguments is invalid.`
    }
    checkId(id);
    checkId(newWebsite);
    let websiteFormat = /^(http):\/\/(www.)[a-zA-Z0-9]{5,}(.com)$/;
    if (!newWebsite.match(websiteFormat)) throw `Invalid Website URL`;

    try {
      const restaurantCollection = await restaurants();
      // let renameRestaurant = await restaurantCollection.findOne({_id: ObjectId(id)});
      // renameRestaurant.website = newWebsite;

      let restaurantWebsite = await restaurantCollection.findOne({
        _id: ObjectId(id),
      });
      if(restaurantWebsite.website == newWebsite) throw `New website URL is same as current value.`;

      const updateRestaurant = {
        website: newWebsite,
      };
      const updatedRestaurant = await restaurantCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: updateRestaurant }
      );
      if (updatedRestaurant.modifiedCount === 0)
        throw `Could not update Restaurant website successfully.`;
      return await this.get(id);
    } catch (e) {
      console.log("Got an error!");
      console.log(e);
    }
  },
};

function convertObjectIdToString(restaurantObj) {
  restaurantObj._id = restaurantObj._id.toString();
  return restaurantObj;
}

function checkId(id) {
    if (!id) throw `ID is not provided.`;
    if (typeof id != "string") throw `ID must be string.`;
    if (id.trim().length < 1) throw `ID is empty.`;
}

