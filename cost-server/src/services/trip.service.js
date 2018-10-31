//Database service for trips
require("dotenv").config();
var mongoose = require("mongoose");
var Trip = require("../models/trip.model");

/**
 * Saves a new trip to the database.
 * @param newTrip The Trip model to save to the database.
 */
var addTrip = function(newTrip) {
  mongoose.connect(process.env.MONGODB_ID);
  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function() {
    console.log("Add Trip");
    newTrip.save(function(err) {
      if (err) return console.error(err);
    });
  });
  return newTrip.id;
};

/**
 * Retrieves all trips from the database
 */
var getTrips = function() {
  mongoose.connect(process.env.MONGODB_ID);
  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function() {
    console.log("Get Trips");
  });
  return Trip.find().exec();
};

module.exports.getTrips = getTrips;
module.exports.addTrip = addTrip;
