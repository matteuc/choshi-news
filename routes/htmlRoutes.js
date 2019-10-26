var db = require("../models");
var passport = require("passport");

module.exports = function (app) {

  app.get("/", function(req, res) {
    if (req.session.passport) {
      var user = req.session.passport.user.profile._json;
      var config = {
        user: user
      };
      
      db.User.findOne({
        token: user.sub
      }).then(function(userInfo){
        config.user.numLikes = userInfo.likes.length;
        config.user.numComments = userInfo.comments.length;
        config.user.numFavorites = userInfo.favorites.length;

        res.render("home", config);

      });
    }
    else {
      // Redirect to Login Page
      res.redirect("/login");

    }
  });

  app.get("/login", function(req, res) {
    if (req.session.passport) {
      res.redirect("/");
    }
    else {
      // Redirect to Login Page
      res.render("landing", { layout: "main-guest" });

    }
  })

  app.get("/channels/:source", function (req, res) {

    if (req.session.passport) {
      var route = req.path;
      var source = req.params.source;
      var user = req.session.passport.user.profile._json;
      var config = {
        user: user
      };

      // Retrieve source schema from database
      db.Source.findOne({
        route: route
      }).populate("pages").then(function (schema) {
        if (schema) {
          // RENDER source page
          config.name = schema.name;
          config.url = schema.url;
          config.logo = schema.logo;
          config.pages = schema.pages;
          config._id = schema._id;
          res.render("channel", config);

        } else {
          // Show "Channel Not Found Page" if the channel entered does not exist
          config.source = source; 
          res.render("channel-dne", config);
        }
      }).catch(function (err) {
        // RENDER error has occurred page with the returned error
        config.err = err;
        res.render("error", config);
      });
    }
    else {
      // Redirect to Login Page
      res.redirect("/login");
    }

  });

  app.get("/saved", function (req, res) {
    // Render user favorites page only if the user is viewing their own page
    if (req.session.passport) {
      var user = req.session.passport.user.profile._json;
      var config = {
        user: user
      };
      var userToken = user.sub;

      // Render favorites
      db.User.findOne({
        token: userToken
      })
      .populate("favorites")
      .select("favorites")
      .then(function(savedArticles){
        res.render("saved", {
          articles: savedArticles
        });

      })

    }
    else {
      // Redirect to Login Page
      res.redirect("/login");
    }
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile"]
    })
  );
  app.get("/auth/google/callback", passport.authenticate("google"), function (req, res) {
    var userAccount = req.session.passport.user.profile._json;

    let userInfo = {};
    userInfo.name = userAccount.given_name;
    userInfo.photo = userAccount.picture;
    userInfo.token = userAccount.sub;

    // Create user account in database
    db.User.findOneAndUpdate({
      token: userInfo.token
    }, userInfo, 
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true
    }).then(function(){
      res.redirect("/");
    })

  });

  app.get("/logout", function (req, res) {
    req.session.destroy(function (err) {
      res.redirect("/login");
    });
  });

  app.get("*", function (req, res) {
    res.redirect("/login");
  });
}