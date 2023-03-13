import mongoose from 'mongoose'

const TaxonomiesSchema = new mongoose.Schema({
    name : String,
    slug : {
        type : String,
        unique : true
    },
    taxonomies : Object
})

export default mongoose.models.Taxonomies || mongoose.model('Taxonomies', TaxonomiesSchema)
