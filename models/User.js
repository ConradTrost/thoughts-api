const { Schema, model } = require('mongoose');
const Thought = require('./Thought');


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: true
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [this]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
})

UserSchema.virtual('friendCount').get(function() {
    return this.friends ? this.friends.length : 0;
});

const User = model('User', UserSchema);

module.exports = User;