import db from "../config/db.js";
import axios from "axios";
import bcrypt from 'bcrypt'
import express from 'express'

const router = express.Router();


export const getAllClients = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM clients");
        res.json(rows);
    } catch (error) {
        console.error("Error fetching clients:", error);
        res.status(500).json({ error: "Failed to fetch clients" });
    }
};


router.post('/clients/register', async (req, res) => {
    try {
       // console.log(req.body);
        const { username, email,phoneNumber,password } = req.body.client;
   //     console.log("username : "+username);
    //    console.log("email : "+email);
    //    console.log("password : "+password);
     //   console.log("phoneNumber : "+phoneNumber);

        const hashedPassword = await bcrypt.hash(password, 10);
        const role = 1;

        const [result] = await db.query("INSERT INTO users (username,phoneNumber,email, password, user_role) VALUES (?, ?, ?, ?, ?)", [username, phoneNumber,email, hashedPassword,role]);
       // console.log(result);
       
        if(result.affectedRows > 0){
            console.log("client registered successfully");
             return res.status(200).json({message:"Client registered successfully"});
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:err});
    
    }
})


router.get('/client/myreservations/:clientUsername',async(req,res)=>{
    try {
       //  console.log(req.params);
        const clientUsername = req.params.clientUsername;

        const [rows] = await db.query("SELECT * FROM reservations WHERE username = ?", [clientUsername]);
       // console.log('rows : ',rows)
        res.json(rows);
    } catch (error) {
        console.error("Error fetching reservations:", error);
        res.status(500).json({ error: "Failed to fetch reservations" });
    }
})

export default router;