const mongoose = require("mongoose");

// Correct schema for a resume
const resumeSchema = new mongoose.Schema(
  {
    profile: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
      url: { type: String },
      summary: { type: String },
      location: { type: String },
    },
    workExperiences: [
      {
        company: { type: String },
        jobTitle: { type: String },
        date: { type: String },
        descriptions: { type: [String] },
      },
    ],
    educations: [
      {
        school: { type: String },
        degree: { type: String },
        date: { type: String },
        gpa: { type: String },
        descriptions: { type: [String] },
      },
    ],
    projects: [
      {
        project: { type: String },
        date: { type: String },
        descriptions: { type: [String] },
      },
    ],
    skills: {
      featuredSkills: [
        {
          skill: { type: String },
          rating: { type: Number },
        },
      ],
      descriptions: { type: [String] },
    },
    custom: { descriptions: { type: [String] } },
    fileId: { type: mongoose.Schema.Types.ObjectId },
    fileName: { type: String },
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
