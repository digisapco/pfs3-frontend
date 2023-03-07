import mongoose from 'mongoose'

const PropertiesSchema = new mongoose.Schema({
    mlsId   : String,
    name    : String,
    slug    : {
        type: String,
        unique: true
    },
    property : Object,
    address  : Object,
    listPrice : String,
    photosOrigin : Array,
    photosOptimized : Array,
    mls : Object,
    geo : Object,
    description : String,
    listDate : Date,
    modifiedDate : Date,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

export default mongoose.models.Properties || mongoose.model('Properties', PropertiesSchema)
