const express = require("express");
const app = express();

/* Database connection */
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/items", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", (error) => {
   console.error(error);
});

db.once("open", () => {
   console.log("Database Connected");
})

/* Configure server to use JSON */
app.use(express.json());

/* Create router to routes js file */
const itemsRouter = require('./routes/items');

/* Tell the app to use router if '/items' is queried */
app.use('/items', itemsRouter);

/* Get app to listen on port */
app.listen(3000, () => console.log("Server Started"));