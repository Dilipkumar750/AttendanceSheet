const Resume = require("../modals/resumeSchema");

exports.uploadResume = async (req, res) => {
  try {
    const resumeData = JSON.parse(req.body.value);
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // console.log("Uploaded file:", file);
    // console.log("Resume data:", resumeData);

    const newResume = new Resume({
      ...resumeData,
      fileId: file.id,
      fileName: file.filename,
    });
    // console.log("newResume: ", newResume);

    await newResume.save();

    return res.status(201).json({
      message: "Resume uploaded successfully",
      resume: newResume,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};



exports.getAllResume = async (req, res) => {
  try {
      const data = await Resume.find();
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
