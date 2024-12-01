const mongoose = require('mongoose');

const DashBoardSchema = new mongoose.Schema({
  IsActive: { type: Boolean },  // Changed "0" to boolean
  CreatedBy: { type: String },
  CreatedDate: { type: String },
  DtOfJoining: { type: String},
  FirstName: { type: String},
  LastName: { type: String },
  ModifiedBy: { type: String },
  ModifiedDate: { type: String},
  Phone:{type:String},
  CompanyId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"tblCompany"
  }
}, { timestamps: true });

// Explicitly specify the collection name as 'tblemployee'
const DahBoardModel = mongoose.model("tblemployee", DashBoardSchema);

module.exports = DahBoardModel;
