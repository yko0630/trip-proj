//Routing for the api

let express = require("express");
let router = express.Router();

//controllers
let tripController = require("../controllers/trip.controller");

//routes
router.get("/getTrips", tripController.getTrips);
router.post("/addTrip", tripController.addTrip);
router.post("/addExpense", tripController.addExpense);
router.post("/deleteExpense", tripController.deleteExpense);
router.post("/deleteTrip", tripController.deleteTrip);
router.post("/addMember", tripController.addMember);
router.post("/deleteMember", tripController.deleteMember);
router.post("/settleUp", tripController.settleUp);

module.exports = router;
