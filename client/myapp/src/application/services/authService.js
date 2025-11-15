
import api from '../../infrastructure/api/api_Client';


const API_URL = import.meta.env.VITE_API_URL;

export const authService = {

  loging: async ({ username, password }) => {
    try {
      const response = await api.get(`${API_URL}/login`, { 
        params: { username,password } })
          
       //   console.log("response = ",response);
          
      return response
    } catch (err) {
        console.log("Error ",err);
      return err
    }
  },

}
