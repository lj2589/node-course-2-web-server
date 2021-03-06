const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + "\n", (err) => {
    if (err) {
      console.log("Error: unable to append to file.")
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
  return text.toUpperCase();
})

app.get("/", (req, res) => {
  var obj = {
    page_title: 'Home Page',
    welcome_message: "Hi Tressa! Hi Millie!"
  };
  res.render("home.hbs", obj);
});

app.get("/about", (req, res) => {
  //res.send("<b>Hello Express<b>");
  var obj = {
    page_title: 'About Page'
  };
  res.render("about.hbs", obj);
});

app.get("/bad", (req, res) => {
  //res.send("<b>Hello Express<b>");
  res.send({
    error_message: "no bueno"
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
