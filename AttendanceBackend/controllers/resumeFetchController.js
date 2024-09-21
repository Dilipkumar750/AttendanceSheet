const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const { GridFSBucket } = require('mongodb');

// Initialize GridFS
const conn = mongoose.connection;
let gfs;
let bucket;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("resumesfile");
  bucket = new GridFSBucket(conn.db, { bucketName: 'resumesfile' }); 
});

const getResumeView = async (req, res) => {
  try {
    const { fileId } = req.params;
    if (!fileId || fileId.length !== 24) {
      return res.status(400).json({ error: "Invalid fileId" });
    }

    const objectId = new mongoose.Types.ObjectId(fileId);
    const file = await bucket.find({ _id: objectId }).toArray();
    if (!file || file.length === 0) {
      return res.status(404).json({ error: "No file exists" });
    }

    const { contentType } = file[0];
    if (contentType === "application/pdf") {
      const readstream = bucket.openDownloadStream(objectId);
      res.set("Content-Type", contentType);
      readstream.pipe(res);
    } else {
      return res.status(404).json({ error: "Not a PDF file" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = { getResumeView };
