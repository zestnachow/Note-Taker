// Importing modules
const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db/db.json");

// Setting up server object and PORT variable
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
