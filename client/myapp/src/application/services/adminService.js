import api from '../../infrastructure/api/api_Client'


const API_URL = import.meta.env.VITE_API_URL;

export const adminService = {

   assigningManager: async(manager)=>{

    try {
      console.log("manager = ",manager);
      
       const response = api.post(`${API_URL}/admin/assign-manager`,{manager})
       console.log("response in admin service = ",response);
       return response;
    }
    catch(err){
      console.log(err);
      return err;
    }

   }

}


