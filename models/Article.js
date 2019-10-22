var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
      type: Date
  },
  numComments: {
    type: Integer,
    default: 0
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }],
  numLikes: {
    type: Integer,
    default: 0
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: "Like"
  }]
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
