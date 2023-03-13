import mongoose from 'mongoose';

const CondsSchema = new mongoose.Schema({
    name : String,
    slug : {
        type : String,
        unique : true
    },
    value : String
});

export default mongoose.models.Conds || mongoose.model('Conds', CondsSchema);
