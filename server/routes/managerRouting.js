import express from 'express';
import db from '../config/db.js'
import multer from 'multer';

const router = express.Router();
const upload = multer();

   //const username = 'nazim07';

    router.post('/manager/stadium',upload.single('stadiumPicture'),async(req,res)=>{
    try {
       
        const {idstadium,name,city,address,phoneNumber,price,schedualTiming} = req.body;
         console.log("stadium id : ",idstadium);
        const stadiumPicture = req.file == undefined ? undefined : req.file.buffer;
        let sqlQuery;     
        let params = [];
        if(stadiumPicture == undefined) {
           sqlQuery = 'UPDATE stadiums set name = ?,city = ?,address = ?,phoneNumber = ?,price = ?,schedualTiming = ? where idstadium = ?';
           params = [name,city,address,phoneNumber,price,schedualTiming,idstadium];
        }
        else {
           sqlQuery = 'UPDATE stadiums set name = ?,city = ?,address = ?,phoneNumber = ?,price = ?,picture = ?,schedualTiming = ? where idstadium = ?';
          // sqlQuery = 'INSERT INTO stadiums (name,city,address,phoneNumber,price,picture,schedualTiming) VALUES (?,?,?,?,?,?,?)';
           params = [name,city,address,phoneNumber,price,stadiumPicture,schedualTiming,idstadium];
        }

        
        const [result] = await db.query(sqlQuery,params)
         if(result.affectedRows > 0){
            console.log("Stadium saved successfully");
            return res.status(200).json({message:"Stadium saved successfully"})
         }
         else {
            console.log("Something went wrong when saving stadium info");
            return res.status(400).json({message:'Something went wrong when saving stadium info'})
         }
         
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:err});
    }
})

function stringToSlotsArray(str) {
  if (!str) return [];
  return str.split('|').map(item => item.replace(/-/g, ' - '));
}


router.get('/manager/getStadiumData',async(req,res)=>{
    try {
      // const username = 'nazim07'
        const [result] = await db.query('SELECT * FROM stadiums');
     //   console.log(result);
     //   console.log('length : ',result.length)
      //  console.log("new result username = "+result[0].username);

        const base64StringPhoto = result.length ==0 ? null : Buffer.from(result[0].picture).toString('base64');
        const slotsArray = result.length==0 ? null :stringToSlotsArray(result[0].schedualTiming);
    //    console.log('slots array :',slotsArray);
        const myStadium = {
            idstadium: result.length==0 ? null :result[0].idstadium,
            name: result.length==0 ? null :result[0].name,
            city: result.length==0 ? null :result[0].city,
            address: result.length==0 ? null :result[0].address,
            phoneNumber: result.length==0 ? null :result[0].phoneNumber,
            price: result.length==0 ? null :result[0].price,
            picture: base64StringPhoto,
            schedualTiming: result.length==0 ? null :slotsArray,
        }
          
        return res.status(200).json(myStadium);        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:err});
    }
})

router.get('/manager/getReservations',async(req,res)=>{
  try {
    
    const [result] = await db.query('SELECT * FROM reservations');
   // console.log(result);

    return res.status(200).json(result);

  }
  catch(err){
    console.log(err);
    return res.status(500).json({error:err});
  }
})

router.get('/manager/getTodayReservations',async(req,res)=>{
  try {
    let today = new Date().toISOString().split('T')[0];
    console.log('today : ',today);

    const [result] = await db.query('SELECT * FROM reservations WHERE date = ?',[today]);
   // console.log(result);

    return res.status(200).json(result);

  }
  catch(err){
    console.log(err);
    return res.status(500).json({error:err});
  }
})

router.put('/manager/updateReservationStatus',async(req,res)=>{
   try {
    
    const {id,newStatus} = req.body;
    console.log('id : ',id,' status : ',newStatus);

    const [result] = await db.query('UPDATE reservations SET status = ? WHERE idreservation = ?',[newStatus,id]);

    let returnedStatus = newStatus ==1 ? 'Confirmed' : 'Cancelled';

    if(result.affectedRows > 0){
      console.log(`reservation was successfully updated to ${returnedStatus}`);
      return res.status(200).json({success:1,id:id,newStatus:newStatus,returnedStatus:returnedStatus})
    }
    else {
      return res.status(200).json({success:0})
    }
   }
   catch(error){
    console.log(error);
    return res.status(500).json({error:error})
   }
})

router.get('/manager/reservationsStats',async(req,res)=>{

  try {

    const sqlQuery = `SELECT SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) AS confirmed_count,
                             SUM(CASE WHEN status = 0 THEN 1 ELSE 0 END) AS pending_count,
                             SUM(CASE WHEN status = -1 THEN 1 ELSE 0 END) AS rejected_count FROM reservations`
       
                             const [result] = await db.query(sqlQuery);
                 //            console.log('stats : ',result);
     return res.status(200).json(result);                        
  }
  catch(error){
    return res.status(500).json({error:error});
  }

})

export default router ;




