import api from "../../infrastructure/api/api_Client";


const API_URL = import.meta.env.VITE_API_URL;

export const clientService = {


     register : async(client)=>{
        try {
   //         console.log("api = ",API_URL)
            console.log("client in clientService = ",client);
                 const response = await api.post(`${API_URL}/clients/register`,{client})
                 console.log(response);
                 return response;
        }
        catch(err){
            console.log(err);
            return err;
        }
     },

     myReservations: async(clientUsername)=>{
        try {
         const response = await api.get(`${API_URL}/client/myreservations/${clientUsername}`)
      //   console.log('response = ',response);
           
         return response;
        }
        catch(err){
            console.log(err);
            return err;
        }
     }

}