import express from 'express';
import bcrypt from 'bcrypt';
import db from '../config/db.js';
const router = express.Router();



/**
 * 
 * body =  {
  manager: {
    managerUsername: 'wailll',
    managerEmail: 'admin@gmail.com',
    managerPassword: '123456',
    managerConfirmPassword: '123456'
  }
}

 */

router.post('/admin/assign-manager',async(req,res)=>{
    try {
        console.log("body = ",req.body);

        const {managerUsername,managerEmail,managerPassword} = req.body.manager;

        const hashedPassword = await bcrypt.hash(managerPassword,10); 

        const [result] = await db.query("INSERT INTO users (username,email,password,user_role) VALUES(?,?,?,?)",[managerUsername,managerEmail,hashedPassword,2]);

        if(result.affectedRows>0){
            console.log("manager was assigned successfully");
            return res.status(200).json("Manager assigned successfully");
        }
        else {
            return res.status(400).json("Error appeared during assigning manager");
        }

    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:err});
    }
})



export default router;