import express from 'express';
import db from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = express.Router();




router.get('/login',async(req,res)=>{
    try {
       console.log('login');
        const {username,password} = req.query;
     //   console.log('username = ',username);
      //  console.log('password = ',password);

        const [user] = await db.query('SELECT password,user_role,username,phoneNumber FROM users WHERE username = ?',[username]);
     //   console.log(user);
     //   console.log(user.length);
        if(user.length == 0){
            return res.status(400).json({message:'negative'});
        }
        
        const isMatch =  bcrypt.compareSync(password,user[0].password);
        console.log('isMatch = ',isMatch);
        if(!isMatch){
            return res.status(400).json({message:'negative'});
        }
        const user_role = user[0].user_role;
        const phoneNumber = user[0].phoneNumber;
       // console.log("user_role : ",user_role);
       // const token = jwt.sign({id: user[0].username},process.env.JWT_SECRET,{expiresIn:'3h'});
        return res.status(200).json({message:'success',user:{username,user_role,phoneNumber}});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:'server error'});
    }
})








export default router;