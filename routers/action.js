const { setRandomFallback } = require('bcryptjs');
const express = require('express')
const mongoose = require('mongoose')
const auth = require('../middleware/auth')
const User = require('../models/User')

const router = express.Router();


router.put('/like',auth,(req,res)=>{
    console.log('like called');
    User.findByIdAndUpdate(req.body.likeid,{
        $push:{like:req.user._id}
    },{
        new:true
    }
    ,(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
    }
    )
    res.send();
})

router.put('/superlike',auth,(req,res)=>{
    console.log('superlike called');
    User.findByIdAndUpdate(req.body.superlikeid,{
        $push:{superlike:req.user._id}
    },{
        new:true
    }
    ,(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
    }
    )
    res.send();
})

router.put('/block',auth,(req,res)=>{
    User.findByIdAndUpdate(req.body.block,{
        $pull:{like:req.user._id, superlike:req.user._id}
    },{
        new:true
    },
    (err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
    })
    res.send();
})

module.exports = router