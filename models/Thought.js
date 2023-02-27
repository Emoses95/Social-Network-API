const { Schema, model } = require('mongoose');
const reactionSchema = require("./Reaction");
const Schema = mongoose.Schema;


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
            timestamp_col: TIMESTAMP,
            default: CURRENT_TIMESTAMP
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    }, { timestamps: true });
// Retrieves the length of the thought's reactions array field 
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;

});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;