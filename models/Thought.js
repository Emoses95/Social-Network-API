const { Schema, model } = require('mongoose');

// subdocment
const reactionSchema = new Schema(
    {
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => new Date(timestamp).toLocaleString()
        }
    },
    {
        toJSON: {
            getters: true,
        }
    }
)


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            Min_length: 1,
            Max_length: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => formatDate(timestamp)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [
            reactionSchema
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    }
);

// Retrieves the length of the thought's reactions array field 
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;

});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;