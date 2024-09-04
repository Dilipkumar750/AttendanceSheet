const path = require("path")
const Etable= require("../models/etableModel")
const xlsx = require("xlsx");
const EtableMaster = require("../models/etableModel");
exports.uploadFile = async (req, res) => {
    // Access the uploaded file
    const file = req.file;


    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const workbook = xlsx.readFile(file.path);
        const sheetNames = workbook.SheetNames;
        const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
        // Save file information to MongoDB 
        const newFile = excelData.map(value => {
            
            return{...value} 
            
        
    });
       await Etable.insertMany(newFile)
     res.send({
        message: 'File uploaded and data extracted successfully!',
    });
    }catch (error) {
        res.status(500).send('Error saving file information.');
    }
}

exports.getExcelldata = async (req, res) => {
    try {
        const files = await EtableMaster.find();
        res.status(200).json(files)
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving files', error });
    }
}
exports.updateExcelldata = async (req, res) => {
    const _id = req.params.id
    // console.log(_id)
    try {
        const data = await EtableMaster.findById(_id);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: 'Error while getBY Id', error });
    }
}
exports.editExcelldata = async (req, res) => {
    const _id = req.params.id
    const value=req.body 
    try {
        const data = await EtableMaster.findByIdAndUpdate(_id,value, // Update only the specific field
            { new: true });
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: 'Error While Update', error });
    }
}
exports.deleteExcelldata = async (req, res) => {
    const _id = req.params.id
    try {
        const data = await EtableMaster.findByIdAndDelete(_id);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: 'Error While Update', error });
    }
}