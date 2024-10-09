const mongoose = require('mongoose');

// Create a schema that allows dynamic keys (JSON format)
const fileSchema = new mongoose.Schema({}, { strict: false });

const EtableMaster = mongoose.model('excel_Data_collection', fileSchema);

module.exports = EtableMaster;
