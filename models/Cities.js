import mongoose from 'mongoose'

const CitiesSchema = new mongoose.Schema({
    name : String,
    slug : {
        type : String,
        unique : true
    }
});

export default mongoose.models.Cities || mongoose.model('Cities', CitiesSchema);
