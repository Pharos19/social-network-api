const { Schema, model, Types } = require('mongoose')

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,

        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Enter a valid email address',
            ],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],

    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)

const User = model('User', userSchema)

module.exports = User