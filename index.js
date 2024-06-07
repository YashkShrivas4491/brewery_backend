const BreweryReview = require("./models/review.model");

const bodyParser = require("body-parser");
const cors = require("cors");

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from Node API server");
});

const uri =
  "mongodb+srv://yashkshrivas1234:vfSd7gHUiDU9ap1m@backenddb.psldhrb.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB";

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to the database");
    app.listen(3100, () => {
      console.log("Server is running on port 3100");
    });
  })
  .catch((err) => {
    console.error("Connection failed to the database:", err.message);
    console.error("Error details:", err);
  });

app.get("/reviews", async (req, res) => {
  try {
    const { userEmail, breweryId } = req.query;

    if (!userEmail && !breweryId) {
      return res.status(400).send("Email or BreweryId is required");
    }

    let query = {};

    if (userEmail) {
      query.email = userEmail;
    } else if (breweryId) {
      query.breweryId = breweryId;
    }

    const reviews = await BreweryReview.find(query).exec();

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Handle POST Request
app.post("/reviews", async (req, res) => {
  try {
    console.log(req.body);
    const { stars, reviewComment, email, breweryId, breweryName } = req.body;

    if (!stars || !reviewComment || !email || !breweryId || !breweryName) {
      return res
        .status(400)
        .send(
          "Stars, Review Comment, Email, BreweryId, and BreweryName are required"
        );
    }

    const newReview = new BreweryReview({
      breweryId,
      breweryName,
      stars,
      email,
      reviewComment,
    });

    await newReview.save();

    res.status(200).send("Review added successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// // Start the server
// const PORT = process.env.PORT || 3100;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
