const path = require("path")
const xlsx = require("xlsx");
const EtableMaster = require("../modals/etableModel");
exports.uploadFile = async (req, res) => {
    // Access the uploaded file
    try {
        const file = req.file;
        // console.log("file: ", file);

        if (!file) {
            return res.status(400).json({ success: false, message: 'No file uploaded.'});
        }

        const workbook = xlsx.readFile(file.path);
        const sheetNames = workbook.SheetNames;
        const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
        // Save file information to MongoDB 
        const newFile = excelData.map(value => {
            return { ...value }


        });
        await EtableMaster.insertMany(newFile)
        return res.status(200).json({ success: true, message: 'File uploaded and data extracted successfully!'});
    } catch (error) {
        return res.status(500).json({ success: false, message: error});
    }
}

exports.getExcelldata = async (req, res) => {
    try {
        const files = await EtableMaster.find();
        // console.log("files: ", files);
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
    try {
      const { id } = req.params; 
  
      const { data } = req.body;

      const result = await EtableMaster.findByIdAndUpdate(
        id, 
        data, 
        { new: true }
      );
  
      res.status(200).json(result);
    } catch (error) {
      console.error("Error while updating:", error);
      res.status(500).json({ message: 'Error While Update', error });
    }
  };
  
exports.deleteExcelldata = async (req, res) => {
    try {
        const _id = req.params.id
        const data = await EtableMaster.findByIdAndDelete(_id);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: 'Error While Update', error });
    }
}