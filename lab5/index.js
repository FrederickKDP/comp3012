// Server logic
const express = require("express");
const app = express(); //returns a web-server
const port = 3001;
const path = require("path");
const ejsLayouts = require("express-ejs-layouts"); //EJS set up
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");


// index, landing page
app.use(express.static(path.join(__dirname, "public")));

// Makes express be able to receive POST req
app.use(express.urlencoded({ extended: false }));

// Set up ejs
app.use(ejsLayouts);
app.set("view engine", "ejs");

// Routes start here
// Show reminders
app.get("/reminders", reminderController.list);
// Create a reminder, GET REQ
app.get("/reminder/new", reminderController.new);

// Individual reminder, visible to the user
app.get("/reminder/:id", reminderController.listOne);
// User clicks edit
app.get("/reminder/:id/edit", reminderController.edit);

// Receives the post req, USER IS SENDING THE DATA
app.post("/reminder/", reminderController.create);

// Implement this yourself
// User sends post update
app.post("/reminder/update/:id", reminderController.update);

// Implement this yourself
app.post("/reminder/delete/:id", reminderController.delete);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
app.get("/register", authController.register);
app.get("/login", authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login", authController.loginSubmit);

app.listen(port, function () {
  console.log(
    `Server running. Visit: localhost:${port}/reminders in your browser 🚀`
  );
});
