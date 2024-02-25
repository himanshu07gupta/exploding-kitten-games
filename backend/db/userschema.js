// // use redis.om will help to work in json formaat  but by the way under the hood data is just key-value pait
// const { Entity, Schema } = require("redis");
const {Entity,Schema} = require("redis-om")
const redis  = require("redis")

class User extends Entity {}
 const userSchema = new Schema(User,{
    firstname : {type : 'string'},
    lastname : {type : 'string'},
    email : {type: 'string'},
    password : {type : 'string'},
    score : {type : 'number',sortable: true}
})



module.exports= {
    userSchema
}
