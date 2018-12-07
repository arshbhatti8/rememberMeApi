const express=require('express');
const router=express.Router();

const contactsModel = require('../models/contactsModel');

router.post('/add',(req,res,next)=>{

    const contact=new contactsModel({
        id:req.body.id,
        name:req.body.name,
        phoneNumber:req.body.phoneNumber,
        emailAddress:req.body.emailAddress,
        company:req.body.company,
        linkedin:req.body.linkedin,
        instagram:req.body.instagram,
        facebook:req.body.facebook,
        notes:req.body.notes
    });

    contact.save()
        .then(result=>{
            console.log(result);
            res.status(201).json({
                message:'User Created'
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err,
                message:"Error in storing to database"
            });
        })
});


router.get('/:userId',(req,res,next)=>{
    const id= req.params.userId;
    contactsModel.findOne({id:id})
        .exec()
        .then(doc=>{
            console.log("This is from the database",doc);
            if(doc){
                res.status(200).json({doc});
            } else{
                res.status(404).json({
                    message:"No valid entry found for provided id "
                })
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
        });
});

module.exports=router;