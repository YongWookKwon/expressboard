// <File.js> //
//==dependencies==//
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');


//==schema==//
const fileSchema = mongoose.Schema({ 
    originalFileName:{type:String},
    serverFileName:{type:String},
    size:{type:Number},
    uploadedBy:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
    postId:{type:mongoose.Schema.Types.ObjectId, ref:'post'},
    isDeleted:{type:Boolean, default:false},
});


//==instance methods==//
fileSchema.methods.processDelete = function() {  //삭제요청 처리
    this.isDeleted = true;
    this.save();
};
/*
binary 파일을 프로그램에서 읽거나 수정하려면 
스트림이라는 것을 만들어야 한다는 것만 꼭 기억해 줍시다.
*/
fileSchema.methods.getFileStream = function() {
    let stream;
    let filePath = path.join(__dirname, '..', 'uploadedFiles', this.serverFileName);
    let fileExists = fs.existsSync(filePath);
    if(fileExists) {
        stream = fs.createReadStream(filePath);  //파일을 읽기전용으로 바꿈
    } else {
        this.processDelete();
    }
    return stream;
}


//==model export==//
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