import api from '../../infrastructure/api/api_Client'

const API_URL = import.meta.env.VITE_API_URL;

export const managerService = {
  getStadiumData: async()=>{
     try {

      const response = await api.get(`${API_URL}/manager/getStadiumData`);
      console.log('stadium data : ',response);
      return response;

     }
     catch(err){
      console.error("Error accured during get stadium data");
      return err;
     }
  },

  saveStadiumInfo: async(stadium) => {
    try {
      console.log("service stadium :",stadium);
      const response = await api.post(`${API_URL}/manager/stadium`, stadium/*, {headers: {'Content-Type': 'multipart/form-data',}}*/);
      return response;
    } catch (error) {
      console.error('Error saving stadium info:', error);
      throw error;
    }
  },

    getAllReservations: async()=>{
      try {

        const response = await api.get(`${API_URL}/manager/getReservations`)
        return response;

      }
      catch(error){
        console.error('Error during fetching reservations ',error);
        return error;
      }
    },

     getTodayReservations: async()=>{
      try {

        const response = await api.get(`${API_URL}/manager/getTodayReservations`)
        return response;

      }
      catch(error){
        console.error('Error during fetching reservations ',error);
        return error;
      }
    },

    updateReservationStatus: async(id,newStatus)=>{
      try {
        const response = await api.put(`${API_URL}/manager/updateReservationStatus`,{id,newStatus});
        return response;
      }
      catch(error){
        console.error('Error during updating reservation status ',error);
        return error;
      }
    },

    getReservationsStats: async()=>{
      try {
        
        const response = await api.get(`${API_URL}/manager/reservationsStats`);
     //   console.log('response : ',response);
        return response;
      }
      catch(error){
        console.error(error);
        return error;
      }
    }



}
