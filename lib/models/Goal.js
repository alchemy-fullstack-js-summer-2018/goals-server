const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString } = require('./required-types');

const schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        goal: RequiredString,
        completed: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true
    }
);

schema.statics = {
    getByUserId(id) {
        return this.find({ userId: id })
            .lean();
    },
    toggleCompleteById(id) {
        return this.findById(id)
            .lean()
            .then(({ _id, completed }) => {
                return this.updateById(_id, { completed: !completed });
            });
            
    },
    getUsersGoals() {
        return this.aggregate([
            { $group:
                {
                    _id: '$userId',
                    completed: { $sum: 1 },
                    total: { $sum: 1 }
                }
            },
            { $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: '_id',
                as: 'user' }
            },
            { $unwind: '$user' },
            { $project: { 
                _id: 1,
                name: '$user.name',
                completed: 1,
                total: 1
            } },
            
        ]);
    }
};

module.exports = mongoose.model('Goal', schema);