const router = require('express').Router();
const { createEvent, getEvents, getEventsByCollege, getEventsByUser, deleteEvent } = require('../controllers/Event');
router.get("/getEvents", getEvents);
router.post("/getEventsByCollege", getEventsByCollege);
router.post("/getEventsByUser", getEventsByUser);
router.post("/createEvent", createEvent);
router.post("/deleteEvent", deleteEvent);

module.exports = router;