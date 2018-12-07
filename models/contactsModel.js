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
    flag:{type:Boolean,required:true},
    keyword:{
        location:{type:String,required:false},
        dayTime:{type:String,required:false},
        personName:{type:String,required:false},
    }
});

module.exports = mongoose.model('Contact',userSchema);