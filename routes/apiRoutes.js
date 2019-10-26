var db = require("../models");
var CronJob = require("cron").CronJob;
var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");


module.exports = function (app) {
    // Create Source Icons
    // db.SourceIcon.create({
    //     name: "Reddit",
    //     iconPath: "./media/images/reddit-icon.png"
    // });

    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }


    // Get all channel icons
    app.get("/api/icons", function (req, res) {
        db.SourceIcon.find({}).then(function (icons) {
            let iconsArr = icons.map(function (icon) {
                icon.name = titleCase(icon.name);
                return icon;
            })
            res.json(iconsArr);
        })
    })

    // Retrieving articles from the specific source in the database
    app.get("/api/articles/:sourceID/:pageID", function (req, res) {
        var sourceID = req.params.sourceID
        var pageID = req.params.pageID
        db.SourcePage.findOne({
            _id: pageID,
            source: sourceID
        }).populate("articles").select("articles").then(function (schema) {
            if (schema) {
                res.json(schema.articles)
            } else {
                res.json({});
            }
        }).catch(function (err) {
            res.json(err);
        });
    });

    // Scraping articles from the source's page
    app.get("/api/scrape/:sourceID/:pageID", function (req, res) {
        var sourceID = req.params.sourceID
        var pageID = req.params.pageID
        let pageURL;

        var articles = [];
        // RETRIEVE SOURCE STRUCTURE 
        db.SourcePage.findOne({
            _id: pageID,
            source: sourceID
        }).populate("source")
            // SCRAPE
            .then(function (sourcePageObj) {
                var structures = sourcePageObj.source.structure;

                pageURL = sourcePageObj.url;

                axios.get(pageURL).then(function (response) {
                    var $ = cheerio.load(response.data);
                    structures.forEach(function(structure){
                        $(structure.container).each(function (i, element) {
                            var article = {};
    
                            // Retrieve URL
                            var url = $(element).find(structure.url).attr("href");
                            article.url = url;
    
                            // Retrieve remaining article information
                            var articleInfoKeys = ["title", "description", "author", "timestamp", "image"];
    
                            for (key of articleInfoKeys) {
                                if (structure[key].container) {
                                    var value;
                                    var valueContainer = $(element).find(structure[key].container);
    
                                    if (structure[key].text) {
                                        value = valueContainer.text();
                                    } else if (structure[key].attr.length != 0) {
                                        value = valueContainer.attr(structure[key].attr);
                                    } else {
                                        value = "";
                                    }
    
                                    article[key] = value;
                                }
                            }
    
                            articles.push(article);
                        });
                    })

                    createArticles(articles);
                });
            })

        // INSERT INTO DATABASE (IF IT DOESN'T ALREADY EXIST)
        function createArticles(articles) {
            // First create articles
            var articleIDs = [];
            var bulk = db.Article.collection.initializeOrderedBulkOp();
            articles.forEach(function (article) {
                // Correcting for sources that use relative links
                if (article.title && article.url) {
                    if (!article.url.includes("http")) {
                        article.url = `${pageURL.split(".com")[0]}.com${article.url}`

                    }
                    bulk.find(article).upsert().updateOne(article);
                }
            });

            bulk.execute(function (err, bulkRes) {
                if (err) res.json(err);
                articleIDs = bulkRes.getUpsertedIds();
                addArticles(articleIDs);
            });

        }

        function addArticles(articleIDs) {
            // Add articles into SourcePage 
            db.SourcePage.findOneAndUpdate(
                {
                    _id: pageID,
                    source: sourceID
                },
                {
                    $addToSet: {
                        articles:
                        {
                            $each: articleIDs
                        }
                    }
                },
                {
                    new: true
                }).then(function () {
                    // End call to scrape articles
                    res.json({});
                })
        }

    });

    // Retrieving all likes for the specified article
    app.get("/api/articles/:id/likes", function (req, res) {
        var id = req.params.id;
        db.Article.findOne({
            _id: id
        }).populate("likes").select("likes ").then(function (data) {
            if (data) {
                res.json(data.likes)
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
        }).populate("comments").select("comments ").then(function (data) {
            if (data) {
                res.json(data.comments)
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
            }).populate("favorites").select("favorites ").then(function (data) {
                if (data) {
                    res.json(data.favorites)
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

    // Retrieve all like and favorite IDS for a certain user
    app.get("/api/profile/:userID", function (req, res) {
        var response = {
            error: ""
        };
        var user = req.session.passport.user.profile._json;
        var userToken = user.sub;
        var pathToken = req.params.userID;
        if (req.session.passport && (userToken == pathToken)) {
            db.User.findOne({
                token: userToken
            })
                .populate("likes")
                .select("favorites + likes")
                .then(function (data) {
                    if (data) {
                        res.json(data);
                    } else {
                        res.json({});
                    }
                }).catch(function (err) {
                    res.json(err);
                });
        }
        else {
            response.error = `Access to ${pathToken}'s likes and favorites is not permitted.`;
            res.json(response);
        }
    })

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
                    return db.Article.findOneAndUpdate({ _id: articleID }, { $push: { comments: mongoose.Types.ObjectId(newComment._id) } }, { new: true });
                })
                .then(function () {
                    // ... then to user
                    return db.User.findOneAndUpdate({ token: userToken }, { $push: { comments: mongoose.Types.ObjectId(newComment._id) } }, { new: true });
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
        // Add to article and to user

        var articleID = req.params.articleID;
        var response = {
            error: ""
        };
        var user = req.session.passport.user.profile._json;
        var userToken = user.sub;
        var pathToken = req.body.userID;
        var like = {
            author: user.given_name,
            authorPhoto: user.picture,
            article: mongoose.Types.ObjectId(articleID)
        };
        if (req.session.passport && (userToken == pathToken)) {
            let like_id;
            db.Like.create(like)
                .then(function (newLike) {
                    // Add to article
                    like_id = newLike._id;
                    return db.Article.findOneAndUpdate({ _id: articleID }, { $push: { likes: mongoose.Types.ObjectId(like_id) } }, { new: true });
                })
                .then(function () {
                    // ... then to user
                    res.json({
                        id: like_id
                    });
                    return db.User.findOneAndUpdate({ token: userToken }, { $push: { likes: mongoose.Types.ObjectId(like_id) } }, { new: true });
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
        var articleID = req.body.articleID;
        var response = {
            error: ""
        };
        var user = req.session.passport.user.profile._json;
        var userToken = user.sub;
        var pathToken = req.params.userID;
        if (req.session.passport && (userToken == pathToken)) {
            db.User.findOneAndUpdate({ token: userToken }, { $push: { favorites: mongoose.Types.ObjectId(articleID) } }, { new: true })
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
                        .then(function (updatedC) {

                            res.json(updatedC);
                        });
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
                    return db.Article.findOneAndUpdate({ _id: articleID }, { $pull: { likes: likeID } })
                })
                .then(function (updatedL) {
                    return db.Like.deleteOne({
                        _id: likeID
                    });
                })
                .then(function () {
                    res.json(updatedL);
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

    function refreshAll() {

    }

    function deleteOldArticles(days) {

    }


    // API REQUEST THAT SCRAPES AND DELETES ARTICLES FROM THE DATABASE 
    // THAT ARE OLDER THAN 15 DAYS EVERY THREE HOURS

    // Once on Heroku, use Heroku Scheduler
    var updateFeed = new CronJob("0 0 */3 * * *", function () {
        refreshAll();
        deleteOldArticles(15);
    }, function () { }, true)
}