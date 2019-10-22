var db = require("../models");

module.exports = function (app) {
    // Retrieving articles from the specific source in the database
    app.get("/api/articles/:source", function (req, res) {
        var source = req.params.source
        db.Source.findOne({
            name: source
        }).populate("articles").select("articles - _id").then(function (schema) {
            if (schema) {
                res.json(schema.articles)
            } else {
                res.json({});
            }
        }).catch(function (err) {
            res.json(err);
        });
    });

    // TODO: Scraping articles from the source's page
    app.get("/api/scrape/:source", function (req, res) {
    });

    // Retrieving all likes for the specified article
    app.get("/api/articles/:id/likes", function (req, res) {
        var id = req.params.id;
        db.Article.findOne({
            _id: id
        }).populate("likes").select("likes - _id").then(function (schema) {
            if (schema) {
                res.json(schema.likes)
            } else {
                res.json({});
            }
        }).catch(function (err) {
            res.json(err);
        });


    });

    // Retrieving all comments for the specified article
    app.get("/api/articles/:id/comments", function (req, res) {
        var id = req.params.id;

        db.Article.findOne({
            _id: id
        }).populate("comments").select("comments - _id").then(function (schema) {
            if (schema) {
                res.json(schema.comments)
            } else {
                res.json({});
            }
        }).catch(function (err) {
            res.json(err);
        });
    });

    // Retrieve all articles a user has favorited
    app.get("/api/favorites/:userID", function (req, res) {
        var response = {
            error: ""
        };
        var user = req.session.passport.user.profile._json;
        var userToken = user.sub;
        var pathToken = req.params.userID;
        if (req.session.passport && (userToken == pathToken)) {
            db.User.findOne({
                token: userToken
            }).populate("favorites").select("favorites - _id").then(function (schema) {
                if (schema) {
                    res.json(schema.favorites)
                } else {
                    res.json({});
                }
            }).catch(function (err) {
                res.json(err);
            });
        }
        else {
            response.error = `Access to ${pathToken}'s favorites is not permitted.`;
            res.json(response);
        }
    });

    // Create a comment
    app.post("/api/articles/:articleID/comments", function (req, res) {
        var comment = JSON.parse(req.body.comment);

        // Add to article and to user
        var articleID = req.params.articleID;
        var response = {
            error: ""
        };
        var user = req.session.passport.user.profile._json;
        var userToken = user.sub;
        var pathToken = req.body.userID;
        if (req.session.passport && (userToken == pathToken)) {
            db.Comment.create(comment)
                .then(function (newComment) {
                    // Add to article
                    return db.Article.findOneAndUpdate({ _id: articleID }, { $push: { comments: newComment._id } }, { new: true });
                })
                .then(function () {
                    // ... then to user
                    return db.User.findOneAndUpdate({ token: userToken }, { $push: { comments: newComment._id } }, { new: true });
                })
                .catch(function (err) {
                    // If an error occurred, send it to the client
                    res.json(err);
                });
        }
        else {
            response.error = `Creation of a comment for ${pathToken} is not permitted.`;
            res.json(response);
        }


    });

    // Create a like
    app.post("/api/articles/:articleID/likes", function (req, res) {
        var like = JSON.parse(req.body.like);
        // Add to article and to user

        var articleID = req.params.articleID;
        var response = {
            error: ""
        };
        var user = req.session.passport.user.profile._json;
        var userToken = user.sub;
        var pathToken = req.body.userID;
        if (req.session.passport && (userToken == pathToken)) {
            db.Like.create(like)
                .then(function (newLike) {
                    // Add to article
                    return db.Article.findOneAndUpdate({ _id: articleID }, { $push: { likes: newLike._id } }, { new: true });
                })
                .then(function () {
                    // ... then to user
                    return db.User.findOneAndUpdate({ token: userToken }, { $push: { likes: newLike._id } }, { new: true });
                })
                .catch(function (err) {
                    // If an error occurred, send it to the client
                    res.json(err);
                });
        }
        else {
            response.error = `Creation of a like for ${pathToken} is not permitted.`;
            res.json(response);
        }


    });

    // Create a favorite
    app.post("/api/favorites/:userID", function (req, res) {
        var articleID = req.params.articleID;
        var response = {
            error: ""
        };
        var user = req.session.passport.user.profile._json;
        var userToken = user.sub;
        var pathToken = req.params.userID;
        if (req.session.passport && (userToken == pathToken)) {
            db.User.findOneAndUpdate({ token: userToken }, { $push: { favorites: articleID } }, { new: true })
                .then(function (newFav) {
                    res.json(newFav);
                })
                .catch(function (err) {
                    // If an error occurred, send it to the client
                    res.json(err);
                });

        }
        else {
            response.error = `Creation of a favorite for ${pathToken} is not permitted.`;
            res.json(response);
        }


    });

    // TODO: Create articles
    app.post("/api/articles", function (req, res) {
        var articles = JSON.parse(req.body.articles);


    });

    // Delete a comment
    app.delete("/api/articles/:articleID/comments", function (req, res) {
        var articleID = req.params.articleID;
        var commentID = req.body.commentID;
        var response = {
            error: ""
        };
        var user = req.session.passport.user.profile._json;
        var userToken = user.sub;
        var pathToken = req.body.userID;
        if (req.session.passport && (userToken == pathToken)) {
            // Delete from user
            db.User.findOneAndUpdate({ token: userToken }, { $pull: { comments: commentID } })
                .then(function () {
                    // ... then from article
                    db.Article.findOneAndUpdate({ _id: articleID }, { $pull: { comments: commentID } })
                })
                .catch(function (err) {
                    // If an error occurred, send it to the client
                    res.json(err);
                });

        }
        else {
            response.error = `Deletion of ${pathToken}'s comments is not permitted.`;
            res.json(response);
        }

    });

    // Delete a like
    app.delete("/api/articles/:articleID/likes", function (req, res) {
        var articleID = req.params.articleID;
        var likeID = req.body.likeID;
        var response = {
            error: ""
        };
        var user = req.session.passport.user.profile._json;
        var userToken = user.sub;
        var pathToken = req.body.userID;
        if (req.session.passport && (userToken == pathToken)) {
            // Delete from user
            db.User.findOneAndUpdate({ token: userToken }, { $pull: { likes: likeID } })
                .then(function () {
                    // ... then from article
                    db.Article.findOneAndUpdate({ _id: articleID }, { $pull: { likes: likeID } })
                })
                .catch(function (err) {
                    // If an error occurred, send it to the client
                    res.json(err);
                });
        }
        else {
            response.error = `Deletion of ${pathToken}'s likes is not permitted.`;
            res.json(response);
        }

    });

    // Delete a favorite
    app.delete("/api/favorites/:userID", function (req, res) {
        var articleID = req.body.articleID;
        var response = {
            error: ""
        };
        var user = req.session.passport.user.profile._json;
        var userToken = user.sub;
        var pathToken = req.params.userID;
        if (req.session.passport && (userToken == pathToken)) {
            db.User.findOneAndUpdate({ token: userToken }, { $pull: { favorites: articleID } }, { new: true })
                .then(function (userUpdate) {
                    res.json(userUpdate);
                })
                .catch(function (err) {
                    // If an error occurred, send it to the client
                    res.json(err);
                });

        }
        else {
            response.error = `Deletion of ${pathToken}'s favorites is not permitted.`;
            res.json(response);
        }

    });

    // API REQUEST THAT DELETE ARTICLES FROM THE DATABASE THAT ARE OLDER THAN 30 DAYS

}