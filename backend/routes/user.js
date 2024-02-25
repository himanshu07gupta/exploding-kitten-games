const express = require("express")
const { Entity, Schema } = require("redis-om");
const userrouter = express.Router();
const jwt = require("jsonwebtoken")
const z = require("zod")
const {JWT_secret} = require("../secret_key")
const {client} = require("../db/redis_client")
const {userSchema} = require("../db/userschema.js");
const { authmiddleware } = require("../authmiddleware");



const userRepository = client.fetchRepository(userSchema);
(async()=>{
    await userRepository.createIndex();
})()

/*  signup */
/////////////////////////////
const checkuser_structure = z.object({
    email :z.string().email(),
    fname : z.string(),
    lname : z.string(),
    password :z.string().min(6)
})

userrouter.post("/signup",async function(req,res){
    const user_data = req.body

    const validate = checkuser_structure.safeParse(user_data);
    if((!validate.success))
    { return res.status(411).json({
     message : "incorrect user data type"
 })}

 const persons = await userRepository.search()
 .where('email').equals(req.email).return.first()

  if(persons){
    return res.status(411).json({
        message : "user already exists"
    })
  }
  
  let user = await userRepository.createEntity({
    firstname : req.body.firstname,
    lastname : req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    score: 0,
})
  const id = await userRepository.save(user)
  
  const token = jwt.sign({
    id
 },JWT_secret)

 res.json({
    message : "data is added succesfully",
    token : token
})

})

///////////////////////////////////
/*  signin  */
const sigin_schema = z.object({
    email : z.string().email(),
    password : z.string().min(6)
})

userrouter.post("/signin",async function(req,res){
    const check = sigin_schema.safeParse(req.body)
    if(!check.success){
      return res.status(401).send("wrong input")
    }

    const persons = await userRepository.search()
 .where('email').equals(req.body.email)
 .where('password').equals(req.body.password).return.first()


if(!persons){
    return res.status(401).json({
        message : "wrong creadential"
    })
  }
else{
    const id = persons.entityId
    const token = jwt.sign({
        id
     },JWT_secret)
    
     res.json({
        email : persons.email,
        token : token
     })
}
})
//////////////////////////////////
userrouter.use(authmiddleware)
/*  Update score */
userrouter.put("/updatescore",async function(req,res){
    const persons = await userRepository.fetch(req.id)
    persons.score = persons.score+1;
    await userRepository.save(user);

    res.json({
        "current score" : persons.score
    })
})

/////////////////////////
/* get highest score */
userrouter.get("/highestscore", async function(req,res){
    const users = await userRepository.search()
    .sortDescending('score')
    .return.page(0, 10)
    .execute();

    res.json({
        "users" : users.map(function(user){
            return({
                "firstname" : user.firstname,
                "lastname" : user.lastname,
                "score" : user.score,
                "id" : users.entityId
            })
        })
    })
})

module.exports ={
    userrouter
}