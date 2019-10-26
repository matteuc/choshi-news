var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var SourcePageSchema = new Schema({
    pageName: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    source: {
        type: Schema.Types.ObjectId,
        ref: "Source"
    },
    articles: [{
        type: Schema.Types.ObjectId,
        ref: "Article"
    }]
});

// This creates our model from the above schema, using mongoose's model method
var SourcePage = mongoose.model("SourcePage", SourcePageSchema);

// Export the Article model
module.exports = SourcePage;
