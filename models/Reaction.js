const { Schema, model } = require('mongoose');
const Schema = mongoose.Schema;

const reactionSchema = new Schema(
    {
        reactionId: {
            type: mongoose.Types.ObjectId,
            default: mongoose.Types.ObjectId,
            required: true
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 280

        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            timestamp_col: TIMESTAMP,
            default: CURRENT_TIMESTAMP
        }

    }
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;