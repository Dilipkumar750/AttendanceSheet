

const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({},{strict:false});

const EtableMaster = mongoose.model('excel_Data_collection', fileSchema);

module.exports = EtableMaster;
