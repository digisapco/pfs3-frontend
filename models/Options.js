import mongoose from 'mongoose'

const OptionsSchema = new mongoose.Schema({
    name : String,
    value : String
})

export default mongoose.models.Options || mongoose.model('Options', OptionsSchema)