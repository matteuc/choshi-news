var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var SourceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    route: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    // colors: {
    //     nav: {
    //         type: String,
    //         required: true
    //     },
    //     bg: {
    //         type: String,
    //         required: true
    //     },
    //     header: {
    //         type: String,
    //         required: true
    //     },
    //     timestamp: {
    //         type: String,
    //         required: true
    //     },
    //     author: {
    //         type: String,
    //         required: true
    //     },
    //     description: {
    //         type: String,
    //         required: true
    //     }
    // },
    // fonts: {
    //     header: {
    //         type: String,
    //         required: true
    //     },
    //     timestamp: {
    //         type: String,
    //         required: true
    //     },
    //     author: {
    //         type: String,
    //         required: true
    //     },
    //     description: {
    //         type: String,
    //         required: true
    //     },
    // },
    pages: [{
        type: Schema.Types.ObjectId,
        ref: "SourcePage"
    }],
    structure: {
        container: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        title: {
            container: {
                type: String,
                required: true
            },
            text: {
                type: Boolean,
                default: true
            },
            attr: {
                type: String,
                default: ""
            }
        },
        description: {
            container: {
                type: String,
                required: true
            },
            text: {
                type: Boolean,
                default: true
            },
            attr: {
                type: String,
                default: ""
            }
        },
        author: {
            container: {
                type: String,
                required: true
            },
            text: {
                type: Boolean,
                default: true
            },
            attr: {
                type: String,
                default: ""
            }
        },
        timestamp: {
            container: {
                type: String
            },
            text: {
                type: Boolean,
                default: true
            },
            attr: {
                type: String,
                default: ""
            }
        },
        image: {
            container: {
                type: String
            },
            attr: {
                type: String,
                default: "src"
            }
        }
    }
    // https://docs.mongodb.com/manual/reference/operator/projection/slice/ (RETURNING A SPECIFIC # OF RESULTS)
   

});

// This creates our model from the above schema, using mongoose's model method
var Source = mongoose.model("Source", SourceSchema);

// Export the Article model
module.exports = Source;
