const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    goal: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
}
);

schema.statics = {
    getGoalsByUser(id) {
        return this.find({ user: id }).lean();
    },

    getAllGoals() {
        return this.aggregate([
            { 
                $group: { 
                    _id: '$user',
                    goals: { $push: '$goal' } } 
            },
            {
                $lookup:
                    {
                        from: 'users',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'name'
                    }
            },
            { 
                $unwind: '$name' 
            },
            {
                $project: {
                    _id: 1,
                    name: '$name.name',
                    goals: 1
                }
            }

        ]);
    }
};

module.exports = mongoose.model('Goal', schema);