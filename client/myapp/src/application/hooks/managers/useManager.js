import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import { showError,showSuccess } from '../../../utility/sweetalert';
import { managerService } from '../../services/managerService';


export const useManager = ()=>{

    const queryClient = useQueryClient();

    const {data:reservations,isLoading:reservationsLoading,isError:reservationsError} = useQuery({
        queryKey: ['allReservations'],
        queryFn: async()=>{
           // console.log("stadium useManager = ",formData);
            const response = await managerService.getAllReservations();
            if(response.status !=200){
                throw new Error(response.message || 'Error during fetching stadium info');
            }
         //   console.log("response in useManager : ",response.data);
            return response.data;
        },
        staleTime: Infinity,
    })

        const {data:todayReservations,isLoading:todayReservationsLoading,isError:todayReservationsError} = useQuery({
        queryKey: ['todayReservations'],
        queryFn: async()=>{
           // console.log("stadium useManager = ",formData);
            const response = await managerService.getTodayReservations();
            if(response.status !=200){
                throw new Error(response.message || 'Error during fetching stadium info');
            }
            console.log("response in useManager : ",response.data);
            return response.data;
        },
        staleTime: Infinity,
    })

    
    const updateReservationStatus = useMutation({
        mutationKey: ['todayReservations'],
        mutationFn: async({id,newStatus})=>{
            console.log("status : ",newStatus);
            const res = await managerService.updateReservationStatus(id,newStatus);
            console.log("response in useManager : ",res);
            return res.data;
        },
     onSuccess: (res) => {
                  const { id, newStatus } = res;
         console.log(`id : ${id} and newStatus : ${newStatus}`)
        // Update React Query cache manually
        queryClient.setQueryData(['todayReservations'], (oldData) => {
            if (!oldData) return [];

            return oldData.map(r =>
                r.idreservation == id
                    ? { ...r, status: newStatus }
                    : r
            );
        });

         queryClient.setQueryData(['allReservations'], (oldData) => {
            if (!oldData) return [];

            return oldData.map(r =>
                r.idreservation == id
                    ? { ...r, status: newStatus }
                    : r
            );
        });

        /*         queryClient.setQueryData(['myReservations'], (oldData) => {
            if (!oldData) return [];

            return oldData.map(r =>
                r.idreservation == id
                    ? { ...r, status: newStatus }
                    : r
            );
        });*/
        queryClient.invalidateQueries({queryKey: ['myReservations']});

        queryClient.invalidateQueries({queryKey: ['stats']});

            if(res.success==1){
                    
               showSuccess('Successfull updating',`Reservation status was successfully updated to ${res.returnedStatus}`);
            }
            else{
                showError('Updating Failed','Something went wrong');
            }
        },
        onError: ()=>{  
           showError('Updating Failed','Something went wrong');
        }
    })


       
    const {data,isLoading,isError} = useQuery({
        queryKey: ['myStadium'],
        queryFn: async()=>{
           // console.log("stadium useManager = ",formData);
            const response = await managerService.getStadiumData();
            if(response.status !=200){
                throw new Error(response.message || 'Error during fetching stadium info');
            }
       //     console.log("response in useManager : ",response.data);
            return response.data;
        },
        staleTime: Infinity,
    })


    const fillStadiumInfo = useMutation({
        mutationKey: ['myStadium'],
        mutationFn: async(formData)=>{
            console.log("stadium useManager = ",formData);
            const res = await managerService.saveStadiumInfo(formData);
            console.log("response in useAdmin : ",res);
            return res;
        },
     onSuccess: (res) => {
          //  console.log("res in useAdmin : ",res)
            if(res.status ==200){
                queryClient.invalidateQueries({queryKey: ['myStadium']});
               showSuccess('successfull Filling','Stadium was saved successfully with this informations');
            }
            else{
                showError('Filling Failed','Something went wrong');
            }
        },
        onError: ()=>{  
           showError('Filling Failed','Something went wrong');
        }
    })

    const {data:stats,isLoading:statsLoading,isError:statsError} = useQuery({
      queryKey: ['stats'],
      queryFn: async()=>{
         const response = await managerService.getReservationsStats();
         if(response.status !=200){
             throw new Error(response.message || 'Error during fetching stadium info');
         }
     //    console.log("response in useManager : ",response.data);
         return response.data;
      },
      staleTime: Infinity,
    })

    return {
        myStadium : data || [],
        isLoading: isLoading,
        isError: isError,
        reservations: reservations,
        reservationsLoading: reservationsLoading,
        reservationsError: reservationsError,
        todayReservations: todayReservations,
        todayReservationsLoading: todayReservationsLoading,
        todayReservationsError: todayReservationsError,
        updateReservation: (id,newStatus) => updateReservationStatus.mutateAsync({ id, newStatus }),
        saveStadiumInfo: fillStadiumInfo.mutateAsync,
        stats: stats,
        statsLoading: statsLoading,
        statsError: statsError,
    }
}