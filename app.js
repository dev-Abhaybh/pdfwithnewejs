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

// // connecting mongoose with mongodb

// mongoose.set("strictQuery", true);

// mongoose.connect(
//   "mongodb+srv://Abhay:abhay123@cluster0.2hu46of.mongodb.net/?retryWrites=true&w=majority"
//   //mongodb+srv://abhay:abhay123@cluster0.tpuujrd.mongodb.net/?retryWrites=true&w=majority
//   // useNewUrlParser: true,
//   // useUnifiedTopology: true,
//   // useCreateIndex: true,
//   // useFindAndModify: false
// );

// //checking for conformation of connectivity for database

// const db = mongoose.connection;
// db.on(
//   "error",
//   console.error.bind(
//     console,
//     "connection error:****************************************************"
//   )
// );
// db.once("open", () => {
//   console.log("database connected!!");
// });

// module.exports = db;

// const schema = graphQl.graphQl();

// app.use("/graphql", expressGraphQL({ schema: schema, graphiql: true }));

module.exports = app;
