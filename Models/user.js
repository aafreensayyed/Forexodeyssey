const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    firstName:{
        type:'string',
        required:[true,['Please enter first name']],
    },
    LastName:{
        type:'string',
        required:[true,['Please enter Last name']],
    },
    email:{
        type:'string',
        required:[true,['Please enter valid email']],
        unique:true,
    },
    phone:{
        type:'number',
        required:[true,['Please enter valid email']],
    },
    password:{
        type:'string',
        required:true,
    }
})
module.exports=mongoose.model('user',userSchema);