//Trip controller

var Models = require("../models/trip.model");
var TripService = require("../services/trip.service");

/**
 * Retrieves all stored trips for the given user.
 * @param res The response to send to the client containing all trips.
 */
async function getTrips(req, res) {
  let ownerID = req.googlePayload["sub"];
  let trips = await TripService.getTrips(ownerID);
  res.send(trips);
}

/**
 * Adds a trip for the given user
 */
async function addTrip(req, res) {
  let trip = buildTripFromRequest(req);
  let success = await TripService.addTrip(trip);
  if (success) {
    res.status(200).send(trip);
  } else {
    res.status(418).send();
  }
}

async function addExpense(req, res) {
  let trip = buildTripFromRequest(req);
  let expense = new Models.Expense(req.body.expense);
  let success = await TripService.addExpense(trip, expense);
  if (success) {
    res.status(200).send();
  } else {
    res.status(418).send();
  }
}

async function deleteTrip(req, res) {
  let trip = buildTripFromRequest(req);
  let success = await TripService.deleteTrip(trip);
  if (success) {
    res.status(200).send();
  } else {
    res.status(418).send();
  }
}

function buildTripFromRequest(req) {
  let trip = new Models.Trip(req.body.trip);
  let ownerModel = new Models.Member({
    id: req.googlePayload["sub"],
    name: req.googlePayload["name"]
  });
  trip.owner = ownerModel;
  trip.ownerID = ownerModel.id;
  return trip;
}

module.exports.getTrips = getTrips;
module.exports.addTrip = addTrip;
module.exports.addExpense = addExpense;
module.exports.deleteTrip = deleteTrip;
