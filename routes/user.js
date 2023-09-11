const express = require("express");
const router = express.Router();
const controller = require("../controller/user");

const path = require("path");

const jwt = require("jsonwebtoken");
router.use(express.static(path.join(__dirname, "public")));

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

router.post("/signup", controller.createSignupController);
router.post("/login", controller.createloginController);

// A
module.exports = router;
