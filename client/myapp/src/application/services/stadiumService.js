import api from '../../infrastructure/api/api_Client'

const API_URL = import.meta.env.VITE_API_URL;


export const stadiumService = {

 getAllStadiums : async()=>{
  try {
    const response = await api.get(`${API_URL}/stadiums/getAllStadiums`);
    //console.log("response in stadiums : ",response.data);
    return response;
  }
  catch(err){
    console.error(err);
    return err;
  }

  },

  
  createReservation : async(reservation)=>{
    try {
      console.log('reservation : ',reservation);
      const response = await api.post(`${API_URL}/stadiums/createReservation`,reservation);
      return response;
    }
    catch(err){
      console.error(err);
      return err;
    }
  }

}