const mongoose = require('mongoose');

const updateOptions = {
    new: true,
    runValidators: true
};

const updateById = schema => {
    schema.static('updateById', function(id, update){
        return this.findByIdAndUpdate(id, update, updateOptions);
    });
};

mongoose.plugin(updateById);