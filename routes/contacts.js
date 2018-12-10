const express=require('express');
const router=express.Router();

const contactsModel = require('../models/contactsModel');

router.post('/add',(req,res,next)=>{
    console.log(req.body);

    const contact=new contactsModel({
        id:req.body.id,
        name:req.body.name,
        phoneNumber:req.body.phoneNumber,
        emailAddress:req.body.emailAddress,
        company:req.body.company,
        linkedin:req.body.linkedin,
        instagram:req.body.instagram,
        facebook:req.body.facebook,
        notes:req.body.notes,
        flag:req.body.flag,
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

router.get('/',(req,res,next)=>{
    contactsModel
        .find()
        .exec()
        .then(docs=>{
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
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

router.patch('/:id',(req,res)=>{
    const id=req.params.id;
    const user=req.body;
    console.log(req.body);
    contactsModel.update({id:id},user)
        .exec()
        .then(result=>{
            console.log(result);
            res.status(200).json({
                message:"User Edited Successfully",
                result:result
            })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });

    router.patch('/delete/:id',(req,res,next)=>{
        console.log(req.params);
        const id=req.params.id;
        contactsModel.remove({id:id})
            .exec()
            .then(result=>{
                res.status(200).json({result});
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json(
                    {error:err})
            });

    });

});


module.exports=router;