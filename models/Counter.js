// <Counter.js> //
//==dependencies==//
const mongoose = require('mongoose');


//==schema==//
/*
Counter는 '{name:'posts',count:0}'라는 데이터 
단 하나만을 가질 예정이며, 새 게시물이 생성될 때마다 
게시물은 이 값을 읽어와서 1을 더한 후 그 값을 
게시물번호로 사용하고, 'posts' counter의 
count값을 1 증가시키게 됩니다.
*/
const counterSchema = mongoose.Schema({
    name:{type:String, required:true},
    count:{type:Number, default:0},
});

const Counter = mongoose.model('counter', counterSchema);
module.exports = Counter;