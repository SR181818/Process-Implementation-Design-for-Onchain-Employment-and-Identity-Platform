const mongoose = require('mongoose');

const passportDetailsSchema = new mongoose.Schema({
  passportNumber: String,
  fullName: String,
  dateOfBirth: String,
  nationality: String,
  placeOfBirth: String,
  passportIssueDate: String,
  passportExpiryDate: String,
  issuingAuthority: String,
  signature: String,
});

const visaDetailsSchema = new mongoose.Schema({
  visaNumber: String,
  visaType: String,
  visaIssueDate: String,
  visaExpiryDate: String,
  visaPlaceOfIssue: String,
  visaPassportNumber: String,
  holderName: String,
  purposeOfVisit: String,
  durationOfStay: String,
  entryExitDetails: String,
});

const userSchema = new mongoose.Schema({
  passportDetails: passportDetailsSchema,
  visaDetails: visaDetailsSchema,
  employer: String,
  sector: String,
  phone: String,
  address: String,
  emergencyContact: String,
  homelandAddress: String,
  faceImage: String, // Path to the uploaded image
});

const User = mongoose.model('User', userSchema);

module.exports = User;
