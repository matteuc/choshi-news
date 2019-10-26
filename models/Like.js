var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var LikeSchema = new Schema({
    authorPhoto: {
        type: String
    },
    author: {
        type: String,
        required: true
    },
    article: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Article"
    }
});

// This creates our model from the above schema, using mongoose's model method
var Like = mongoose.model("Like", LikeSchema);

// Export the Like model
module.exports = Like;
