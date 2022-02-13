const express = require("express");
const { connectToDb } = require("../config/mongoConnection");
const router = express.Router();
const restaurantData = require("../data/restaurants");
const reviewsData = require("../data/reviews");

const mongoCollections = require("../config/mongoCollections");
const restaurants = mongoCollections.restaurants;
let { ObjectId } = require("mongodb");

router.post("/", async (req, res) => {
  const requestBody = req.body;
  let name = requestBody.name;
  let location = requestBody.location;
  let phoneNumber = requestBody.phoneNumber;
  let website = requestBody.website;
  let priceRange = requestBody.priceRange;
  let cuisines = requestBody.cuisines;
  let serviceOptions = requestBody.serviceOptions;
  try {
    if (
      !name ||
      !location ||
      !phoneNumber ||
      !website ||
      !priceRange ||
      !cuisines ||
      !serviceOptions
    ) {
      res.status(400).json({ error: "All inputs are not provided." });
      return;
    }
    if (typeof name != "string") {
      res.status(400).json({ error: "Name must be string." });
      return;
    }
    if (typeof location != "string") {
      res.status(400).json({ error: "Location must be string." });
      return;
    }
    if (typeof phoneNumber != "string") {
      res.status(400).json({ error: "PhoneNumber must be string." });
      return;
    }
    if (typeof website != "string") {
      res.status(400).json({ error: "Website must be string." });
      return;
    }
    if (typeof priceRange != "string") {
      res.status(400).json({ error: "Price Range must be string." });
      return;
    }

    if (name.trim().length < 1) {
      res.status(400).json({ error: "Name is empty." });
      return;
    }
    if (location.trim().length < 1) {
      res.status(400).json({ error: "Location is empty." });
      return;
    }
    if (phoneNumber.trim().length < 1) {
      res.status(400).json({ error: "PhoneNumber is empty." });
      return;
    }
    if (website.trim().length < 1) {
      res.status(400).json({ error: "Website is empty." });
      return;
    }
    if (priceRange.trim().length < 1) {
      res.status(400).json({ error: "Price Range is empty." });
      return;
    }

    // Reference: https://www.regextester.com/94189
    let phoneFormat = /^\d{3}-\d{3}-\d{4}$/gm;
    if (!phoneNumber.match(phoneFormat)) {
      res.status(400).json({ error: "Invalid Phone number." });
      return;
    }
    let websiteFormat = /^(http):\/\/(www.)[a-zA-Z0-9]{5,}(.com)$/;
    if (!website.match(websiteFormat)) {
      res.status(400).json({ error: "Invalid Website URL" });
      return;
    }

    let priceRangeFormat = priceRange.split("");
    if (priceRangeFormat.length < 1 || priceRangeFormat.length > 4) {
      res.status(400).json({ error: "Price out of range." });
      return;
    }
    for (let priceEle of priceRangeFormat) {
      if (priceEle != "$") {
        res.status(400).json({ error: "Invalid Price." });
        return;
      }
    }

    if (!Array.isArray(cuisines)) {
      res.status(400).json({ error: "You must provide an array of cuisines." });
      return;
    }
    if (cuisines.length === 0) {
      res.status(400).json({ error: "You must provide at least one cuisine." });
      return;
    }

    for (const cuisine of cuisines) {
      if (typeof cuisine != "string" || cuisine.trim().length < 1) {
        res.status(400).json({ error: "Cuisines are not a string." });
        return;
      }
    }

    if (typeof serviceOptions != "object") {
      res.status(400).json({ error: "Service Options is not an object." });
      return;
    }
    if (!serviceOptions.hasOwnProperty("dineIn")) {
      res.status(400).json({ error: "Service options does not have dineIn." });
      return;
    }
    if (!serviceOptions.hasOwnProperty("takeOut")) {
      res.status(400).json({ error: "Service options does not have takeOut." });
      return;
    }
    if (!serviceOptions.hasOwnProperty("delivery")) {
      res
        .status(400)
        .json({ error: "Service options does not have delivery." });
      return;
    }

    for (const [key, value] of Object.entries(serviceOptions)) {
      if (typeof value != "boolean") {
        res.status(400).json({ error: "Service options are not boolean." });
        return;
      }
    }
  } catch (e) {
    res.status(400).json({ error: e });
    return;
  }
  try {
    const data = await restaurantData.create(
      name,
      location,
      phoneNumber,
      website,
      priceRange,
      cuisines,
      serviceOptions
    );
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await restaurantData.getAll();
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(404).json({ error: "ID not present" });
      return;
    }
    if (typeof req.params.id != "string") {
      res.status(404).json({ error: "ID must be string." });
      return;
    }
    if (req.params.id.trim().length < 1) {
      res.status(404).json({ error: "ID is empty." });
      return;
    }
    // if (ObjectId.isValid(req.params.id)) {
    //   if (String(new ObjectId(req.params.id)) !== id) {
    //     res.status(400).json({error:'Invalid ID'});
    //     return;
    //   }
    // } else {
    //   res.status(400).json({error:'Invalid ID'});
    //     return;
    // }
    if (!ObjectId.isValid(req.params.id)) {
      res.status(404).json({ error: "Invalid ID" });
      return;
    }
  } catch (e) {
    res.status(404).json({ error: e });
  }
  try {
    const data = await restaurantData.get(req.params.id);
    res.json(data);
  } catch (e) {
    // condition for 404 if id not found
    res.status(404).json({ error: e });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(404).json({ error: "ID not present" });
      return;
    }
    if (typeof req.params.id != "string") {
      res.status(404).json({ error: "ID must be string." });
      return;
    }
    if (req.params.id.trim().length < 1) {
      res.status(404).json({ error: "ID is empty." });
      return;
    }
    // if (ObjectId.isValid(req.params.id)) {
    //   if (String(new ObjectId(req.params.id)) !== id) {
    //     res.status(400).json({error:'Invalid ID'});
    //     return;
    //   }
    // } else {
    //   res.status(400).json({error:'Invalid ID'});
    //     return;
    // }
    if (!ObjectId.isValid(req.params.id)) {
      res.status(404).json({ error: "Invalid ID" });
      return;
    }
  } catch (e) {
    res.status(404).json({ error: e });
  }
  try {
    const data = await restaurantData.remove(req.params.id);
    res.json(data);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.put("/:id", async (req, res) => {
  const requestBody = req.body;
  let id = req.params.id;
  let name = requestBody.name;
  let location = requestBody.location;
  let phoneNumber = requestBody.phoneNumber;
  let website = requestBody.website;
  let priceRange = requestBody.priceRange;
  let cuisines = requestBody.cuisines;
  let serviceOptions = requestBody.serviceOptions;
  
    if (
      !id ||
      !name ||
      !location ||
      !phoneNumber ||
      !website ||
      !priceRange ||
      !cuisines ||
      !serviceOptions
    ) {
      res.status(400).json({ error: "All inputs are not provided." });
      return;
    }
    if (typeof id != "string") {
      res.status(400).json({ error: "ID must be string." });
      return;
    }
    if (typeof name != "string") {
      res.status(400).json({ error: "Name must be string." });
      return;
    }
    if (typeof location != "string") {
      res.status(400).json({ error: "Location must be string." });
      return;
    }
    if (typeof phoneNumber != "string") {
      res.status(400).json({ error: "PhoneNumber must be string." });
      return;
    }
    if (typeof website != "string") {
      res.status(400).json({ error: "Website must be string." });
      return;
    }
    if (typeof priceRange != "string") {
      res.status(400).json({ error: "Price Range must be string." });
      return;
    }

    if (id.trim().length < 1) {
      res.status(400).json({ error: "ID is empty." });
      return;
    }
    if (name.trim().length < 1) {
      res.status(400).json({ error: "Name is empty." });
      return;
    }
    if (location.trim().length < 1) {
      res.status(400).json({ error: "Location is empty." });
      return;
    }
    if (phoneNumber.trim().length < 1) {
      res.status(400).json({ error: "PhoneNumber is empty." });
      return;
    }
    if (website.trim().length < 1) {
      res.status(400).json({ error: "Website is empty." });
      return;
    }
    if (priceRange.trim().length < 1) {
      res.status(400).json({ error: "Price Range is empty." });
      return;
    }

    // Reference: https://www.regextester.com/94189
    let phoneFormat = /^\d{3}-\d{3}-\d{4}$/gm;
    if (!phoneNumber.match(phoneFormat)) {
      res.status(400).json({ error: "Invalid Phone number." });
      return;
    }
    let websiteFormat = /^(http):\/\/(www.)[a-zA-Z0-9]{5,}(.com)$/;
    if (!website.match(websiteFormat)) {
      res.status(400).json({ error: "Invalid Website URL" });
      return;
    }

    let priceRangeFormat = priceRange.split("");
    if (priceRangeFormat.length < 1 || priceRangeFormat.length > 4) {
      res.status(400).json({ error: "Price out of range." });
      return;
    }
    for (let priceEle of priceRangeFormat) {
      if (priceEle != "$") {
        res.status(400).json({ error: "Invalid Price." });
        return;
      }
    }

    if (ObjectId.isValid(id)) {
      if (String(new ObjectId(id)) !== id) {
        res.status(400).json({ error: "Invalid ID" });
        return;
      }
    } else {
      res.status(400).json({ error: "Invalid ID" });
      return;
    }

    if (!Array.isArray(cuisines)) {
      res.status(400).json({ error: "You must provide an array of cuisines." });
      return;
    }
    if (cuisines.length === 0) {
      res.status(400).json({ error: "You must provide at least one cuisine." });
      return;
    }

    for (const cuisine of cuisines) {
      if (typeof cuisine != "string" || cuisine.trim().length < 1) {
        res.status(400).json({ error: "Cuisines are not a string." });
        return;
      }
    }

    if (typeof serviceOptions != "object") {
      res.status(400).json({ error: "Service Options is not an object." });
      return;
    }
    if (!serviceOptions.hasOwnProperty("dineIn")) {
      res.status(400).json({ error: "Service options does not have dineIn." });
      return;
    }
    if (!serviceOptions.hasOwnProperty("takeOut")) {
      res.status(400).json({ error: "Service options does not have takeOut." });
      return;
    }
    if (!serviceOptions.hasOwnProperty("delivery")) {
      res
        .status(400)
        .json({ error: "Service options does not have delivery." });
      return;
    }

    for (const [key, value] of Object.entries(serviceOptions)) {
      if (typeof value != "boolean") {
        res.status(400).json({ error: "Service options are not boolean." });
        return;
      }
    }
  try {
    const data = await restaurantData.update(
      id,
      name,
      location,
      phoneNumber,
      website,
      priceRange,
      cuisines,
      serviceOptions
    );
    res.json(data);
  } catch (e) {
    if(e == 'No restaurant with that id.') {
      res.status(404).json({ error: e });
      return;
    }
    res.status(400).json({ error: e });
  }
});

module.exports = router;
