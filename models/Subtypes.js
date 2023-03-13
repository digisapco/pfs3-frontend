import mongoose from 'mongoose'

const SubtypesSchema = new mongoose.Schema({
    st_value : String,
    st_label : String,
    exclude_search : Boolean,
    is_another : Boolean
});

export default mongoose.models.Subtypes || mongoose.model('Subtypes', SubtypesSchema)