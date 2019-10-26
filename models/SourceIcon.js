var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var SourceIconSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    iconPath: {
        type: String
    },
    route: {
        type: String
    }
});

SourceIconSchema.methods.setRoute = function() {
    this.route = `/channels/${name.split(" ").join("-").toLowerCase()}`;
    // Return the new boolean value
    return this.route;
  };

// This creates our model from the above schema, using mongoose's model method
var SourceIcon = mongoose.model("SourceIcon", SourceIconSchema);

// Export the Like model
module.exports = SourceIcon;
