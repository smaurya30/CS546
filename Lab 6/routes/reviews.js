const express = require("express");
const router = express.Router();
const reviewsData = require("../data/reviews");
let { ObjectId } = require("mongodb");

router.post("/:id", async (req, res) => {
  let requestBody = req.body;
  let restaurantId = req.params.id;
  let title = requestBody.title;
  let reviewer = requestBody.reviewer;
  let rating = requestBody.rating;
  let dateOfReview = requestBody.dateOfReview;
  let review = requestBody.review;

  try {
    if (
      !restaurantId ||
      !title ||
      !reviewer ||
      !rating ||
      !dateOfReview ||
      !review
    ) {
      res.status(400).json({ error: "All inputs are not provided." });
      return;
    }

    if (typeof restaurantId != "string") {
      res.status(400).json({ error: "Name must be string." });
      return;
    }
    if (typeof title != "string") {
      res.status(400).json({ error: "Location must be string." });
      return;
    }
    if (typeof reviewer != "string") {
      res.status(400).json({ error: "PhoneNumber must be string." });
      return;
    }
    if (typeof dateOfReview != "string") {
      res.status(400).json({ error: "Website must be string." });
      return;
    }
    if (typeof review != "string") {
      res.status(400).json({ error: "Price Range must be string." });
      return;
    }
    if (typeof rating != "number") {
      res.status(400).json({ error: "Rating must be number." });
      return;
    }

    if (restaurantId.trim().length < 1) {
      res.status(400).json({ error: "Name is empty." });
      return;
    }
    if (title.trim().length < 1) {
      res.status(400).json({ error: "Location is empty." });
      return;
    }
    if (reviewer.trim().length < 1) {
      res.status(400).json({ error: "PhoneNumber is empty." });
      return;
    }
    if (dateOfReview.trim().length < 1) {
      res.status(400).json({ error: "Website is empty." });
      return;
    }
    if (review.trim().length < 1) {
      res.status(400).json({ error: "Price Range is empty." });
      return;
    }

    if (!isValidObjectId(restaurantId)) {
      res.status(400).json({ error: "Invalid Object Id." });
      return;
    }
    if (rating < 1 || rating > 5) {
      res.status(400).json({ error: "Rating is out of range." });
      return;
    }

    if (!isValidDate(dateOfReview)) {
      res.status(400).json({ error: "Invalid Date of Review." });
      return;
    }
  } catch (e) {
    res.status(400).json({ error: e });
    return;
  }
  try {
    const data = await reviewsData.createReview(
      restaurantId,
      title,
      reviewer,
      rating,
      dateOfReview,
      review
    );
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.get("/:id", async (req, res) => {
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
  //     res.status(400).json({ error: "Invalid ID" });
  //     return;
  //   }
  // } else {
  //   res.status(400).json({ error: "Invalid ID" });
  //   return;
  // }
  if (!ObjectId.isValid(req.params.id)) {
    res.status(404).json({ error: "Invalid ID" });
    return;
  }
  try {
    const data = await reviewsData.getAll(req.params.id);
    if (data.length === 0) {
      res.status(404).json({ error: "No reviews found for this restaurant." });
      return;
    }
    res.json(data);
  } catch (e) {
    // condition for 404 if id not found
    res.status(404).json({ error: e });
  }
});

router.get("/review/:id", async (req, res) => {
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
  //     res.status(400).json({ error: "Invalid ID" });
  //     return;
  //   }
  // } else {
  //   res.status(400).json({ error: "Invalid ID" });
  //   return;
  // }

  if (!ObjectId.isValid(req.params.id)) {
    res.status(404).json({ error: "Invalid ID" });
    return;
  }
  try {
    const data = await reviewsData.get(req.params.id);
    res.json(data);
  } catch (e) {
    // condition for 404 if id not found
    res.status(404).json({ error: e });
  }
});

router.delete("/:id", async (req, res) => {
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
  if (!ObjectId.isValid(req.params.id)) {
    res.status(404).json({ error: "Invalid ID" });
    return;
  }

  try {
    const data = await reviewsData.remove(req.params.id);
    res.json(data);
  } catch (e) {
    // condition for 404 if id not found
    res.status(404).json({ error: e });
  }
});

// Reference: https://www.geeksforgeeks.org/how-to-check-if-a-string-is-valid-mongodb-objectid-in-node-js/
function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    else return false;
  } else {
    return false;
  }
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

module.exports = router;
