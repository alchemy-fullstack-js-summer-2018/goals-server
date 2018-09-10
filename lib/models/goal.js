const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    author: {
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
        default: false,
    }
},
{ timestamps: true });

schema.statics = {

    getByUserId(id) {
        return this.find({ author: id })
            .lean();
    },

    changeCompletedStatusById(id) {
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
                    _id: '$author',
                    completed: {
                        $sum: {
                            $cond: {
                                if: { $eq: ['$completed', true] },
                                then: 1,
                                else: 0
                            }
                        }
                    },
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
            } }
            
        ])
            .then(result => {
                console.log('resulllllllt', result);
                return result;
            });
    }
};

module.exports = mongoose.model('Goal', schema);