import axios from 'axios';
import db from '../config/db.js'
import express from 'express';

const router = express.Router();


router.get('/stadiums/getAllStadiums',async(req,res)=>{
    try {

        const [result] = await db.query('SELECT * FROM stadiums');
        
       /**
        *          result.forEach(element =>{
            element.picture = Buffer.from(element.stadium.picture).toString('base64');
         })
        */

         for(let i=0;i<result.length;i++){
            result[i].picture = Buffer.from(result[i].picture).toString('base64');
         }

         
        return res.status(200).json(result);

    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:err});
    }
})

router.post('/stadiums/createReservation',async(req,res)=>{
    try {


        const {username,phoneNumber,date,hour} = req.body;
        

        const [check] = await db.query('SELECT * FROM reservations WHERE date = ? AND hour = ? AND (status = 0 OR status = 1)',[date,hour]);
//        console.log("check : ",check);

        if(check.length > 0){
            console.log('hour already reserved');
            return res.status(200).json({success:0});
        }

        const [rows] = await db.query('INSERT INTO reservations (username,phoneNumber,date,hour) VALUES (?,?,?,?)',[username,phoneNumber,date,hour]);
  //      console.log("result : ",result);   
        if(rows.affectedRows > 0) {
            console.log("reservation was booked successfully");

        const [result] = await db.query('SELECT idreservation FROM reservations WHERE username = ? ORDER BY idreservation DESC LIMIT 1',[username]);
        const lastInsertId = result[0].idreservation;
        console.log('last inserted id :',lastInsertId);

        req.io.emit('newReservationAdded',{
          idreservation:lastInsertId,
          username:username,
          date:date,
          hour:hour,
          status:0 
        });


             return res.status(200).json({success:1});
        }
          else {
            return res.status(500).json({error:'Something went wrong'});
          }

    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:'Something went wrong'});
    }
})

export default router;
