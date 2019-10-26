var db = require("../models");
var passport = require("passport");

module.exports = function (app) {

  app.get("/", function(req, res) {
    if (req.session.passport) {
      var user = req.session.passport.user.profile._json;
      var config = {
        user: user
      };
      res.render("home", config);
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

  app.get("/channels", function (req, res) {
    if (req.session.passport) {
      var user = req.session.passport.user.profile._json;
      var config = {
        user: user
      };

      // View all available channels (i.e. sources)
      db.SourceIcon.find({}).then(function (icons) {
        // RENDER source selection page
        config.icons = icons;
        res.render("channel-selection", config);

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
      }).then(function (schema) {
        if (schema) {
          // RENDER source page
          config.name = schema.name;
          config.url = schema.url;
          config.logo = schema.logo;
          config.pages = schema.pages;
          config.colors = schema.colors;
          config.fonts = schema.fonts;
        
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

  app.get("/favorites/:userID", function (req, res) {
    // Render user favorites page only if the user is viewing their own page
    if (req.session.passport) {
      var user = req.session.passport.user.profile._json;
      var config = {
        user: user
      };
      var userToken = user.sub;
      var pathToken = req.params.userID;

      if(userToken == pathToken) {
        // Render favorites
        res.render("favorites", config);

      } else {
        // Current user is trying to access another user's favorites
        config.foreignToken = pathToken;
        res.render("no-favorites-access", config)
      }

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

    // Code to perform on user login

    res.redirect("/");
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