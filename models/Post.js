// <Post.js> //
//==dependencies==//
const mongoose = require('mongoose');
const Counter = require('./Counter');


//==schema==//
const postSchema = mongoose.Schema({
  title:{type:String, required:[true,'Title is required!']},
  body:{type:String, required:[true,'Body is required!']},
  author:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
  views:{type:Number, default:0},
  numId:{type:Number},
  createdAt:{type:Date, default:Date.now},
  updatedAt:{type:Date},
}); //ref:'user'를 통해 이 항목의 데이터가 user collection의 id와 연결됨을 mongoose에 알립니다. 
postSchema.pre('save', async function (next){
  let post = this;
  if(post.isNew){
    counter = await Counter.findOne({name:'posts'}).exec();
    if(!counter) counter = await Counter.create({name:'posts'});
    counter.count++;
    counter.save();
    post.numId = counter.count;
  }
  return next();
});


//==model & export==//
const Post = mongoose.model('post', postSchema);
module.exports = Post;