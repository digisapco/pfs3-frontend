import mongoose from 'mongoose'

const CountiesSchema = new mongoose.Schema({
    name : String,
    slug : {
        type : String,
        unique : true
    }
});

export default mongoose.models.Counties || mongoose.model('Counties', CountiesSchema);
