import mongoose from 'mongoose'

const ZipcodesSchema = new mongoose.Schema({
    code : String
});

export default mongoose.models.Zipcodes || mongoose.model('Zipcodes', ZipcodesSchema);
