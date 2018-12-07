const mongoose = require ('mongoose');

const userSchema = mongoose.Schema({
    id:{type:String,required:true},
    name:{type:String,required:true},
    phoneNumber:{type:String,required:true},
    emailAddress:{type:String,required:false},
    company:{type:String,required:false},
    linkedin:{type:String,required:false},
    instagram:{type:String,required:false},
    facebook:{type:String,required:false},
    notes:{type:String,required:true},
});

module.exports = mongoose.model('Contact',userSchema);