//dependencies
const express = require('express');
const { projects } = require('./data.json');

//start the app
const app = express();

//set view engine to pug
app.set('view engine', 'pug');

//set up static assets
app.use(express.static('public'));

//index route for the home page
app.get('/', function (req, res) {

  res.render('index', {
    data:projects});
});

//'about' route
app.get('/about', function (req, res) {
  res.render('about');
});

//dynamic project routes
app.get('/project/:id', function (req, res) {

  //verify project id is valid
  if (!(isNaN(req.params.id))){
    //is a number! is it in range?
    if (req.params.id >= 0 && req.params.id < projects.length) {
      //all good! render the page!
      res.render('project', projects[req.params.id]);
    }
  }

  //still here? you're an error and will be dealt with
  const err = new Error("Project Not Found");
  err.status = 404;
  res.render('missing');
});

//404 error handling section----------------
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);

});

//global error handler----------------
app.use((err, req, res, next) => {

  if (err) {
    //console.log("Global error handler called", err);
  }
  res.locals.error = err;
  res.render('error');
});


//listen on port 3000
app.listen(3000);
console.log("App listening on port 3000");
