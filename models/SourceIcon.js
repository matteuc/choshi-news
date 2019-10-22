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
    color: {
        type: String,
        default: "#ffffff"
    },
    icon: {
        type: String
    },
    fIcon: {
        type: String,
        default: "fas fa-newspaper"
    },
    route: {
        type: String
    }
});

SourceIconSchema.methods.setRoute = function() {
    this.route = `/channels/${name.toLowerCase()}`;
    // Return the new boolean value
    return this.route;
  };

// This creates our model from the above schema, using mongoose's model method
var SourceIcon = mongoose.model("SourceIcon", SourceIconSchema);

// Export the Like model
module.exports = SourceIcon;
