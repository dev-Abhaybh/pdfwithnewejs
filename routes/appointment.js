const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportJwt = require("../middleware/passport")(passport);

const appointmentController = require("../controllers/appointment");

// passport.authenticate("jwt", { session: false }),

router.post("/", appointmentController.pdfGenerator);

//router.post('/',registerDetails.register)
module.exports = router;
