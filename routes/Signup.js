const express = require("express")
const router = express.Router()
const { createUser, activateAccount } = require("../controllers/signup.js")
const { sendEmail } = require("../helpers/mailer.js")



router.post("/signup", createUser)

router.post("/email", sendEmail)


module.exports = router