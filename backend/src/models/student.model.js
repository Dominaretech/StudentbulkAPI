const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    uniqId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    className: {
      type: String,
      required: true,
      trim: true,
    },

    section: {
      type: String,
      required: true,
      trim: true,
    },

    rollNo: {
      type: String,
      required: true,
      trim: true,
    },

    admissionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    fatherName: {
      type: String,
      required: true,
      trim: true,
    },

    fatherMobileNumber: {
      type: String,
      required: true,
      trim: true,
    },

    motherName: {
      type: String,
      default: "",
      trim: true,
    },

    motherMobileNumber: {
      type: String,
      default: "",
      trim: true,
    },

    yearOfJoining: {
      type: Number,
      required: true,
    },

    aadhaarNumber: {
      type: String,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    caste: {
      type: String,
      default: "",
      trim: true,
    },

    communicationAddress: {
      type: String,
      required: true,
      trim: true,
    },

    permanentAddress: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Student", studentSchema);