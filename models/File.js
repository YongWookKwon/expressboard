// <File.js> //
//==dependencies==//
const mongoose = require('mongoose');


//==schema==//
const fileSchema = mongoose.Schema({ 
    originalFileName:{type:String},
    serverFileName:{type:String},
    size:{type:Number},
    uploadedBy:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
    postId:{type:mongoose.Schema.Types.ObjectId, ref:'post'},
    isDeleted:{type:Boolean, default:false},
});

const File = mongoose.model('file', fileSchema);


//==model method==//
File.createNewInstance = async function(file, uploadedBy, postId) {
    return await File.create({
        originalFileName:file.originalname,
        serverFileName:file.filename,
        size:file.size,
        uploadedBy:uploadedBy,
        postId:postId,
    });
}

module.exports = File;