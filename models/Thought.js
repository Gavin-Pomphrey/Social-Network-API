//import dependencies
const { MinKey } = require('mongodb');
const { Schema, model, Types } = require('mongoose');
const User = require('./User');

//create rwaction subdocument schema
const ReactionSchema = new Schema(
    {
        //set custom id to avoid confusion with parent comment _id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'Reaction is required',
            maxlength: 280,
            minLength: 1
        },
        username: {
            type: String,
            required: 'Username is required'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //use getter method to format timestamp on query
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

//create thought schema
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Thought is required',
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //use getter method to format timestamp on query
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: 'Username is required'
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//get total count of reactions on retrieval
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

//create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

//export the Thought model
module.exports = Thought;