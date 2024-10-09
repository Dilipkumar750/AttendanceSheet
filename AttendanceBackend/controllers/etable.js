const path = require("path");
const xlsx = require("xlsx");
const EtableMaster = require("../modals/etableModel");

exports.uploadFile = async (req, res) => {
    try {
        // Access the uploaded file
        const file = req.file;

        if (!file) {
            return res.status(400).json({ success: false, message: 'No file uploaded.' });
        }

        // Read the Excel file
        const workbook = xlsx.readFile(file.path);
        const sheetNames = workbook.SheetNames;
        const worksheet = workbook.Sheets[sheetNames[0]];

        // Extract the header row (first row)
        const headers = xlsx.utils.sheet_to_json(worksheet, { header: 1 })[0];

        // Clean the headers using regex (replace spaces with underscores)
        const cleanedHeaders = headers.map(header => 
            header.replace(/\s+/g, '_').replace(/[^\w]/g, '')
        );

        // Read the data and map it to cleaned headers
        const excelData = xlsx.utils.sheet_to_json(worksheet, { header: 1 }).slice(1);
        const formattedData = excelData.map(row => {
            let rowData = {};
            cleanedHeaders.forEach((header, index) => {
                rowData[header] = row[index] || ""; // Handle undefined cells
            });
            return rowData;
        });

        // Save the formatted data as key-value pairs in MongoDB
        await EtableMaster.insertMany(formattedData);

        return res.status(200).json({ success: true, message: 'File uploaded and data saved successfully!' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

exports.getExcelldata = async (req, res) => {
    try {
        const files = await EtableMaster.find();
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving files', error });
    }
};

exports.updateExcelldata = async (req, res) => {
    const _id = req.params.id;
    try {
        const data = await EtableMaster.findById(_id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving data by ID', error });
    }
};

exports.editExcelldata = async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;

        const result = await EtableMaster.findByIdAndUpdate(id, data, { new: true });
        res.status(200).json(result);
    } catch (error) {
        console.error("Error while updating:", error);
        res.status(500).json({ message: 'Error while updating', error });
    }
};

exports.deleteExcelldata = async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await EtableMaster.findByIdAndDelete(_id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error while deleting', error });
    }
};
