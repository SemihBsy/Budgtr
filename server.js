//------------------------------
// Dependencies
//------------------------------
require('dotenv').config(); // read the .env file (process.env.PORT)
const express = require('express'); // backend framework
const morgan = require("morgan") // logger
const methodOverride = require("method-override")
const budgets = require("./models/budget.js");
//-------------------------------
// Global Variables
//-------------------------------
const PORT = process.env.PORT || 3000

//-----------------------------
// Create Application Object
//-----------------------------
const app = express(); // create our application object

//-----------------------------
// Middleware
//-----------------------------
app.use(morgan("tiny"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));


//-----------------------------
// Routes
//-----------------------------
app.get("/", (req, res) => res.redirect('/budgets') )


app.get("/budgets", (req, res) => {
    res.render('index.ejs', {
        allBudget: budgets
    });
});

app.get("/budgets/new", (req, res) => {
    res.render('new.ejs')
    });

app.post("/budgets", (req, res) => {
    budgets.push(req.body);
    res.redirect("/budgets");
})    

app.get('/budgets/:index', (req, res) => {
    res.render('show.ejs', {
        budget: budgets[req.params.index],
        index: req.params.index
    });
});




app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});