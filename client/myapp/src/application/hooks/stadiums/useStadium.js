import {useMutation, useQuery} from '@tanstack/react-query';

import { stadiumService } from '../../../application/services/stadiumService';
import { showError,showSuccess } from '../../../utility/sweetalert';


export const useStadium = ()=>{


    const {data,isLoading,isError} = useQuery({
          queryKey:['stadiums'],
          queryFn: async()=>{
             
            const response = await stadiumService.getAllStadiums();
           // console.log('stadiums :',response.data);
            return response.data;
          },
          staleTime: Infinity,
    })

    const getStadiumById =  (id)=>{
        let stadium = null;
   console.log(data[0]);
            for(let i=0;i<data.length;i++){
              if(data[i].name==id){
                stadium = data[i];
              }
            }
            return stadium;
;
    }

    const createReservationMutation = useMutation({
      mutationKey: ['reservations'],
      mutationFn: async(reservation)=>{
        const response = await stadiumService.createReservation(reservation);
        return response;
      },
      onSuccess: (res) => {
      //  console.log("res in createReservation : ",res)
      //  console.log('success : ',res.data.success)
      //  console.log('status : ',res.status)

        if(res.status ==200 && res.data.success==1){
           showSuccess('Reservation booked successfully','Success');
        }
        else if(res.status ==200 && res.data.success==0){
          showError('hour already reserved','The stadium is already reserved on this hour choose an other');
        }
        else{
            showError('Reservation Failed','Something went wrong');
        }
      },
      onError: ()=>{  
         showError('Reservation Failed','Something went wrong');
      }
    })

    return {
        stadiums : data || [],
        loading: isLoading,
        error: isError,
        getStadiumById: getStadiumById,
        createReservation : createReservationMutation.mutateAsync,
    }
}