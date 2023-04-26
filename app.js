const express = require("express");

const path = require("path");

// const mongoose = require("mongoose");
const cors = require("cors");

const appointmentRoute = require("./routes/appointment");

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ extended: true }));

// using embedded javascript for views folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// home route

app.use("/appointment", appointmentRoute);

module.exports = app;
